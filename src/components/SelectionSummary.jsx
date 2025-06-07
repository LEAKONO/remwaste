import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function SelectionSummary({ selectedSkip }) {
  if (!selectedSkip) return null;

  const totalPrice = selectedSkip.price + (selectedSkip.price * (selectedSkip.vat / 100));

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-medium text-gray-900">Selected Skip</h3>
            <div className="flex items-center mt-1">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm font-medium mr-3">
                {selectedSkip.size} Yard
              </span>
              <span className="text-gray-600">
                £{totalPrice.toFixed(2)} • {selectedSkip.hirePeriod} days
              </span>
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="flex items-center px-5 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition">
              <FaArrowLeft className="mr-2" />
              Back
            </button>
            <button className="flex items-center px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Continue
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}