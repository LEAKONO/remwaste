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
        const response = await axios.get(
          'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft'
        )
        setSkips(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSkips()
  }, [])

  return (
    <SkipContext.Provider
      value={{ skips, loading, error, selectedSkip, setSelectedSkip }}
    >
      {children}
    </SkipContext.Provider>
  )
}

export function useSkips() {
  return useContext(SkipContext)
}