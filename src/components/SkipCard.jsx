import { FaRuler, FaCalendarAlt, FaCheck, FaRoad } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default function SkipCard({ skip, isSelected, onClick }) {
  // Safely extract values with defaults
  const {
    size = 'Unknown',
    allowed_on_road: allowedOnRoad = true,
    hire_period_days: hirePeriod = 14,
    price_before_vat: rawPrice = 0,
    vat: rawVat = 20,
    description = 'General waste skip'
  } = skip;

  const price = typeof rawPrice === 'string' ? parseFloat(rawPrice) : Number(rawPrice);
  const vatRate = typeof rawVat === 'string' ? parseFloat(rawVat) : Number(rawVat);

  const validPrice = !isNaN(price) && isFinite(price) ? price : 0;
  const validVat = !isNaN(vatRate) && isFinite(vatRate) ? vatRate : 0;
  const totalPrice = validPrice + (validPrice * (validVat / 100));

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden transition-all duration-200 cursor-pointer 
        ${isSelected
          ? 'border-2 border-blue-500 ring-4 ring-blue-200 shadow-xl'
          : 'border border-gray-200 hover:border-blue-300 shadow-md hover:shadow-lg'
        }`}
      onClick={onClick}
    >
      <div className="relative">
        {/* Header with size badge */}
        <div className="h-40 bg-gradient-to-r from-blue-50 to-gray-50 flex items-center justify-center relative">
          <div className="absolute top-4 left-4 bg-white rounded-full shadow-md px-3 py-1 flex items-center border border-gray-100">
            <FaRuler className="text-blue-600 mr-1" />
            <span className="font-semibold text-gray-800">{size} Yard</span>
          </div>
          
          {/* Price debug info (optional) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-xs p-1 rounded font-mono">
              Raw: £{rawPrice} (VAT: {rawVat}%)
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {size} Yard Skip
          </h3>
          <p className="text-gray-600 mb-4">{description}</p>

          <div className="mb-5 space-y-3">
            <div className="flex items-center text-gray-700">
              <FaCalendarAlt className="text-blue-500 mr-2" />
              <span>{hirePeriod} day hire period</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaCheck className="text-green-500 mr-2" />
              <span>Includes delivery & collection</span>
            </div>
            {!allowedOnRoad && (
              <div className="flex items-center text-gray-700">
                <FaRoad className="text-orange-500 mr-2" />
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
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isSelected 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300'
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