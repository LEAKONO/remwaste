import { FaRuler, FaCalendarAlt, FaCheck, FaRoad } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default function SkipCard({ skip, isSelected, onClick }) {
  // Verify the raw skip data structure
  console.log('Raw skip data:', JSON.stringify(skip, null, 2));

  // Safely extract values with defaults
  const {
    size = 'Unknown',
    allowed_on_road: allowedOnRoad = true,
    hire_period_days: hirePeriod = 14,
    price_before_vat: rawPrice = 0,
    vat: rawVat = 20,
    description = 'General waste skip'
  } = skip;

  // Convert to numbers safely
  const price = typeof rawPrice === 'string' ? parseFloat(rawPrice) : Number(rawPrice);
  const vatRate = typeof rawVat === 'string' ? parseFloat(rawVat) : Number(rawVat);

  // Calculate total price with fallbacks
  const validPrice = !isNaN(price) && isFinite(price) ? price : 0;
  const validVat = !isNaN(vatRate) && isFinite(vatRate) ? vatRate : 0;
  const totalPrice = validPrice + (validPrice * (validVat / 100));

  // Debug output
  console.log(`Calculated price: £${validPrice} + ${validVat}% VAT = £${totalPrice.toFixed(2)}`);

  return (
    <div
      className={`bg-white rounded-xl shadow-sm overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'border-blue-500 transform -translate-y-1 shadow-lg'
          : 'border-transparent hover:shadow-md'
      }`}
      onClick={onClick}
    >
      <div className="relative">
        {/* Header with debug info */}
        <div className="h-40 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center relative">
          <div className="absolute top-4 left-4 bg-white rounded-full shadow-md px-3 py-1 flex items-center">
            <FaRuler className="text-blue-500 mr-1" />
            <span className="font-medium text-gray-800">{size} Yard</span>
          </div>
          
          {/* Debug info - will show if price is being read correctly */}
          <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-xs p-1 rounded font-mono">
            Raw: £{rawPrice} (VAT: {rawVat}%)
          </div>
        </div>

        {/* Main content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {size} Yard Skip
          </h3>
          <p className="text-gray-600 mb-4">{description}</p>

          <div className="mb-5 space-y-3">
            <div className="flex items-center">
              <FaCalendarAlt className="text-blue-500 mr-2" />
              <span>{hirePeriod} day hire period</span>
            </div>
            <div className="flex items-center">
              <FaCheck className="text-blue-500 mr-2" />
              <span>Includes delivery & collection</span>
            </div>
            {!allowedOnRoad && (
              <div className="flex items-center">
                <FaRoad className="text-red-500 mr-2" />
                <span>Requires permit for road use</span>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total price</p>
              <p className="text-2xl font-bold text-gray-900">
                £{totalPrice.toFixed(2)}
                <span className="text-sm font-normal text-gray-500 ml-1">inc. VAT</span>
              </p>
            </div>
            <button
              className={`px-4 py-2 rounded-lg font-medium ${
                isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {isSelected ? 'Selected' : 'Select'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

SkipCard.propTypes = {
  skip: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    allowed_on_road: PropTypes.bool,
    hire_period_days: PropTypes.number,
    price_before_vat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string
  }).isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

SkipCard.defaultProps = {
  isSelected: false
};