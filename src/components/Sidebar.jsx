import { FaInfoCircle, FaRoad, FaExclamationTriangle, FaSearch, FaFilter } from 'react-icons/fa';

export default function Sidebar({ searchTerm, setSearchTerm, filters, setFilters }) {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white p-6 rounded-xl shadow-md sticky top-8 border border-gray-200">
        {/* Search */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-3 flex items-center">
            <FaSearch className="mr-2 text-blue-500" />
            Search Skips
          </h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by size..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Filters */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3 flex items-center">
            <FaFilter className="mr-2 text-blue-500" />
            Filters
          </h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.roadLegal}
                onChange={() => setFilters({...filters, roadLegal: !filters.roadLegal})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">Road legal only</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.popular}
                onChange={() => setFilters({...filters, popular: !filters.popular})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">Most popular</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.under200}
                onChange={() => setFilters({...filters, under200: !filters.under200})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">Under £200</span>
            </label>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <FaInfoCircle className="mr-2 text-blue-500" />
            Skip Selection Tips
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <FaRoad className="text-blue-500" />
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
        </div>

        {/* Current Step Indicator */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Current Step</h4>
          <p className="text-blue-600 font-medium">3. Choose Skip Size</p>
        </div>
      </div>
    </aside>
  );
}