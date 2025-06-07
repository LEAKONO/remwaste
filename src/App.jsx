import { SkipProvider } from './contexts/SkipContext'
import SkipSelection from './pages/SkipSelection'

function App() {
  return (
    <SkipProvider>
      <div className="min-h-screen bg-gray-50">
        <SkipSelection />
      </div>
    </SkipProvider>
  )
}

export default App