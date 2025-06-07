import { useSkips } from '../contexts/SkipContext'

export default function SkipCard({ skip, isSelected }) {
  const { setSelectedSkip } = useSkips()

  return (
    <div 
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 
        ${isSelected ? 'ring-2 ring-primary transform scale-[1.02]' : 'hover:shadow-lg'}`}
      onClick={() => setSelectedSkip(skip)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{skip.size} Yard Skip</h3>
            {skip.allowedOnRoad ? null : (
              <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-md mt-1">
                Not Allowed on Road
              </span>
            )}
          </div>
          {skip.size === 5 && (
            <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded-md">
              Most Popular
            </span>
          )}
        </div>

        <div className="mt-4">
          <div className="flex items-center text-gray-600">
            <span className="font-medium">Hire Period:</span>
            <span className="ml-2">{skip.hirePeriod} days</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div>
            <span className="text-gray-500 text-sm">From</span>
            <p className="text-2xl font-bold text-gray-800">£{skip.price}</p>
          </div>
          <button 
            className={`px-4 py-2 rounded-md font-medium 
              ${isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  )
}