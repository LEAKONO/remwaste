import { useSkips } from '../contexts/SkipContext'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

export default function SelectionSummary() {
  const { selectedSkip } = useSkips()

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg transition-all duration-300 
      ${selectedSkip ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            {selectedSkip && (
              <div>
                <h3 className="text-lg font-medium text-gray-800">Selected Skip</h3>
                <p className="text-gray-600">
                  {selectedSkip.size} Yard Skip | £{selectedSkip.price} | {selectedSkip.hirePeriod} Day Hire
                </p>
              </div>
            )}
          </div>
          
          <div className="flex space-x-4">
            <button className="flex items-center px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
              <FaArrowLeft className="mr-2" />
              Back
            </button>
            <button 
              className={`flex items-center px-6 py-3 rounded-lg transition 
                ${selectedSkip ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              disabled={!selectedSkip}
            >
              Continue
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}