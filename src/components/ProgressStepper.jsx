import { useState } from 'react';
import { 
  FaCheck,
  FaMapMarkerAlt,
  FaTrashAlt,
  FaRuler,
  FaFileAlt,
  FaCalendarAlt,
  FaCreditCard,
  FaBars,
  FaTimes
} from 'react-icons/fa';

export default function ProgressStepper({ currentStep = 3 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const steps = [
    { id: 1, name: 'Location', Icon: FaMapMarkerAlt },
    { id: 2, name: 'Waste Type', Icon: FaTrashAlt },
    { id: 3, name: 'Skip Size', Icon: FaRuler },
    { id: 4, name: 'Permit', Icon: FaFileAlt },
    { id: 5, name: 'Date', Icon: FaCalendarAlt },
    { id: 6, name: 'Payment', Icon: FaCreditCard },
  ];

  const CurrentStepIcon = steps[currentStep - 1]?.Icon;

  return (
    <div className="mb-8 px-4">
      {/* Mobile Header */}
      <div className="lg:hidden flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
            currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {CurrentStepIcon && <CurrentStepIcon />}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Step {currentStep}</h3>
            <p className="text-sm text-gray-600">
              {steps[currentStep - 1]?.name}
            </p>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-600 hover:text-blue-600"
        >
          {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white rounded-lg shadow-lg p-4 mb-6 border border-gray-200">
          {steps.map((step) => {
            const StepIcon = step.Icon;
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            
            return (
              <div key={step.id} className="flex items-center py-3 border-b border-gray-100 last:border-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  isCompleted ? 'bg-green-500 text-white' :
                  isCurrent ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {isCompleted ? (
                    <FaCheck className="text-white" />
                  ) : (
                    <StepIcon className={isCurrent ? 'text-white' : 'text-gray-600'} />
                  )}
                </div>
                <div>
                  <p className={`font-medium ${
                    isCompleted || isCurrent ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {step.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Desktop Stepper */}
      <div className="hidden lg:flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 -z-10 transform -translate-y-1/2 rounded-full">
          <div 
            className="bg-blue-600 h-full rounded-full" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
        {steps.map((step) => {
          const StepIcon = step.Icon;
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-green-500 text-white' :
                isCurrent ? 'bg-blue-600 text-white ring-4 ring-blue-200' : 'bg-gray-100 text-gray-400'
              }`}>
                {isCompleted ? (
                  <FaCheck className="text-white" />
                ) : (
                  <StepIcon className={isCurrent ? 'text-white' : 'text-gray-600'} />
                )}
              </div>
              <span className={`mt-2 text-sm font-medium ${
                isCompleted || isCurrent ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}