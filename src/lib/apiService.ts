import { useState, useEffect } from 'react'

// API service for all promotional content
interface ApiResponse<T> {
  success: boolean
  data: T[]
  total: number
  timestamp: string
  error?: string
}

class ApiService {
  private baseUrl = '/api'
  private cache = new Map<string, { data: any, timestamp: number }>()
  private cacheDuration = 30000 // 30 seconds cache
  private pendingRequests = new Map<string, Promise<any>>()

  private async fetchWithLoader<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const cacheKey = `${endpoint}_${JSON.stringify(options)}`
    
    // Check cache first
    const cached = this.cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return cached.data
    }
    
    // Check if request is already pending
    const pendingRequest = this.pendingRequests.get(cacheKey)
    if (pendingRequest) {
      return pendingRequest
    }
    
    // Make new request
    const request = this.makeRequest<T>(endpoint, options)
    this.pendingRequests.set(cacheKey, request)
    
    try {
      const result = await request
      // Cache the result
      this.cache.set(cacheKey, { data: result, timestamp: Date.now() })
      return result
    } finally {
      this.pendingRequests.delete(cacheKey)
    }
  }
  
  private async makeRequest<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
    
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers
        }
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }
      
      return response.json()
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout')
      }
      throw error
    }
  }

  // Offers API
  async getOffers(limit = 2, activeOnly = true): Promise<ApiResponse<any>> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      active: activeOnly.toString()
    })
    return this.fetchWithLoader(`/offers?${params}`)
  }

  // Banners API
  async getBanners(limit = 1, activeOnly = true): Promise<ApiResponse<any>> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      active: activeOnly.toString()
    })
    return this.fetchWithLoader(`/banners?${params}`)
  }

  // Notifications API
  async getNotifications(
    limit = 2, 
    userType: 'all' | 'logged-in' | 'new' | 'premium' = 'all',
    activeOnly = true
  ): Promise<ApiResponse<any>> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      userType,
      active: activeOnly.toString()
    })
    return this.fetchWithLoader(`/notifications?${params}`)
  }

  // Mini Offers API
  async getMiniOffers(limit = 2, activeOnly = true): Promise<ApiResponse<any>> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      active: activeOnly.toString()
    })
    return this.fetchWithLoader(`/mini-offers?${params}`)
  }

  // Courses API
  async getCourses(category?: string, limit = 12): Promise<ApiResponse<any>> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      ...(category && { category })
    })
    return this.fetchWithLoader(`/courses?${params}`)
  }
}

export const apiService = new ApiService()

// Request cache to prevent duplicate calls
const requestCache = new Map<string, Promise<any>>()
const dataCache = new Map<string, { data: any, timestamp: number }>()
const CACHE_DURATION = 60000 // 1 minute

// Custom hooks for API calls with loading states
export function useApiCall<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false) // Start as false to prevent initial loading
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const cacheKey = JSON.stringify({ apiCall: apiCall.toString(), dependencies })
    
    // Check cache first
    const cached = dataCache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setData(cached.data)
      setLoading(false)
      return
    }

    // Check if request is already in progress
    const existingRequest = requestCache.get(cacheKey)
    if (existingRequest) {
      existingRequest.then((result: ApiResponse<T>) => {
        if (isMounted && result.success) {
          setData(result.data || [])
          setLoading(false)
        }
      }).catch(() => {
        if (isMounted) {
          setError('Request failed')
          setLoading(false)
        }
      })
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const request = apiCall()
        requestCache.set(cacheKey, request)
        
        const response = await request
        
        if (isMounted) {
          if (response.success) {
            setData(response.data || [])
            // Cache the result
            dataCache.set(cacheKey, { 
              data: response.data || [], 
              timestamp: Date.now() 
            })
          } else {
            setError(response.error || 'Failed to fetch data')
          }
        }
      } catch (err) {
        if (isMounted) {
          setData([]) // Set empty data instead of error for better UX
          // Don't log 404s or empty responses as errors
          if (err instanceof Error && !err.message.includes('404')) {
            console.warn('API call failed:', err.message)
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
        requestCache.delete(cacheKey)
      }
    }

    // Debounce the request
    const timeoutId = setTimeout(fetchData, 100)

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
    }
  }, dependencies)

  return { 
    data, 
    loading, 
    error,
    refetch: () => {
      const cacheKey = JSON.stringify({ apiCall: apiCall.toString(), dependencies })
      dataCache.delete(cacheKey)
      requestCache.delete(cacheKey)
    }
  }
}