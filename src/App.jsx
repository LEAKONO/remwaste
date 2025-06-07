import { SkipProvider } from './contexts/skipContext'
import SkipSelection from './pages/SkipSelection'

function App() {
  return (
    <SkipProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="fixed inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        
        <div className="relative z-10">
          <SkipSelection />
        </div>
      </div>
    </SkipProvider>
  )
}

export default App