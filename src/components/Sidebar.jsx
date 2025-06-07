import { FaInfoCircle, FaRoad, FaExclamationTriangle } from 'react-icons/fa'

export default function Sidebar() {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white p-6 rounded-xl shadow-md sticky top-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <FaInfoCircle className="mr-2 text-primary" />
          Skip Selection Tips
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <FaRoad className="text-secondary" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">
                Skips over 12 yards aren't road legal and may require special permits.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <FaExclamationTriangle className="text-yellow-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">
                Ensure you have enough space for delivery - most skips require about 3m clearance.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Current Step</h4>
          <p className="text-primary font-medium">3. Choose Skip Size</p>
        </div>
      </div>
    </aside>
  )
}