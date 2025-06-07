import { useState } from 'react';
import { useSkips } from '../contexts/skipContext';
import ProgressStepper from '../components/ProgressStepper';
import Sidebar from '../components/Sidebar';
import SkipCard from '../components/SkipCard';
import SelectionSummary from '../components/SelectionSummary';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { FaFilter, FaSearch } from 'react-icons/fa'; // Added FaSearch import here

export default function SkipSelection() {
  const { skips, loading, error, selectedSkip, setSelectedSkip } = useSkips();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    roadLegal: false,
    popular: false,
    under200: false
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredSkips = skips.filter(skip => {
    // Search filter
    const matchesSearch = skip.size.toString().includes(searchTerm) || 
                         skip.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Additional filters
    const matchesRoadLegal = !filters.roadLegal || skip.allowedOnRoad;
    const matchesPopular = !filters.popular || skip.size === '5';
    const matchesPrice = !filters.under200 || skip.price < 200;
    
    return matchesSearch && matchesRoadLegal && matchesPopular && matchesPrice;
  });

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Skips</h2>
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with stepper */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <ProgressStepper currentStep={3} />
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Choose Your Skip Size
</h1>
          <p className="text-gray-600 mt-2">Select the skip size that best suits your needs

</p>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar - desktop */}
          <div className="hidden lg:block">
            <Sidebar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filters={filters}
              setFilters={setFilters}
            />
          </div>

          {/* Mobile filters */}
          <div className="lg:hidden mb-6">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 mr-4">
                <input
                  type="text"
                  placeholder="Search skips..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <FaFilter />
              </button>
            </div>
          </div>

          {/* Skip cards grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <LoadingSkeleton key={i} />
                ))}
              </div>
            ) : filteredSkips.length > 0 ? (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-gray-600">
                    Showing {filteredSkips.length} {filteredSkips.length === 1 ? 'skip' : 'skips'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredSkips.map((skip) => (
                    <SkipCard
                      key={skip.id}
                      skip={skip}
                      isSelected={selectedSkip?.id === skip.id}
                      onClick={() => setSelectedSkip(skip)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="max-w-md mx-auto">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No skips found</h3>
                  <p className="mt-1 text-gray-500">
                    Try adjusting your search or filter criteria to find what you're looking for.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setFilters({
                          roadLegal: false,
                          popular: false,
                          under200: false
                        });
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Reset filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile filters overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end lg:hidden">
          <div className="bg-white w-4/5 h-full p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Filters</h3>
              <button 
                onClick={() => setMobileFiltersOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <Sidebar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filters={filters}
              setFilters={setFilters}
              isMobile
            />

            <div className="mt-8 flex space-x-4">
              <button
                onClick={() => {
                  setFilters({
                    roadLegal: false,
                    popular: false,
                    under200: false
                  });
                  setMobileFiltersOpen(false);
                }}
                className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selection summary footer */}
      <SelectionSummary selectedSkip={selectedSkip} />
    </div>
  );
}