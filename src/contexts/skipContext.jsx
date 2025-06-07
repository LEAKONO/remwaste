import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const SkipContext = createContext()

export function SkipProvider({ children }) {
  const [skips, setSkips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSkip, setSelectedSkip] = useState(null)

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get(
          'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft'
        )
        
        // Correctly process the data with API field names
        const processedSkips = response.data.map(skip => ({
          id: skip.id || Math.random().toString(36).substr(2, 9),
          size: skip.size || 'Unknown',
          allowed_on_road: skip.allowed_on_road !== false,
          hire_period_days: skip.hire_period_days || 14,
          price_before_vat: skip.price_before_vat || 0,  // Using correct API field
          vat: skip.vat || 20,
          description: skip.description || 'General waste skip',
          allows_heavy_waste: skip.allows_heavy_waste || false
        }))
        
        setSkips(processedSkips)
      } catch (err) {
        console.error('Error fetching skips:', err)
        setError(err.message || 'Failed to load skip data')
      } finally {
        setLoading(false)
      }
    }

    fetchSkips()
  }, [])

  return (
    <SkipContext.Provider
      value={{ 
        skips, 
        loading, 
        error, 
        selectedSkip, 
        setSelectedSkip,
        hasSkips: skips.length > 0
      }}
    >
      {children}
    </SkipContext.Provider>
  )
}

export function useSkips() {
  const context = useContext(SkipContext)
  if (context === undefined) {
    throw new Error('useSkips must be used within a SkipProvider')
  }
  return context
}