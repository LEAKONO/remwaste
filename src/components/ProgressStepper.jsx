import { FaCheck, FaHome, FaLeaf, FaRuler, FaFileAlt, FaCalendarAlt, FaCreditCard } from 'react-icons/fa'

export default function ProgressStepper({ currentStep }) {
  const steps = [
    { id: 1, name: 'Postcode', icon: <FaHome /> },
    { id: 2, name: 'Waste Type', icon: <FaLeaf /> },
    { id: 3, name: 'Skip Size', icon: <FaRuler /> },
    { id: 4, name: 'Permit', icon: <FaFileAlt /> },
    { id: 5, name: 'Date', icon: <FaCalendarAlt /> },
    { id: 6, name: 'Payment', icon: <FaCreditCard /> },
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white 
              ${currentStep >= step.id ? 'bg-primary' : 'bg-gray-300'}`}>
              {currentStep > step.id ? <FaCheck /> : step.icon}
            </div>
            <span className={`mt-2 text-sm font-medium 
              ${currentStep >= step.id ? 'text-primary' : 'text-gray-500'}`}>
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}