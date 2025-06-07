import { useSkips } from '../contexts/SkipContext'
import ProgressStepper from '../components/ProgressStepper'
import Sidebar from '../components/Sidebar'
import SkipCard from '../components/SkipCard'
import SelectionSummary from '../components/SelectionSummary'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function SkipSelection() {
  const { skips, loading, error, selectedSkip } = useSkips()

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        Error loading skip options: {error}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProgressStepper currentStep={3} />
      
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <Sidebar />
        
        <main className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Choose Your Skip Size</h1>
          <p className="text-gray-600 mb-8">Select the skip size that best suits your needs</p>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skips.map((skip) => (
                <SkipCard 
                  key={skip.id} 
                  skip={skip} 
                  isSelected={selectedSkip?.id === skip.id}
                />
              ))}
            </div>
          )}
        </main>
      </div>
      
      <SelectionSummary />
    </div>
  )
}