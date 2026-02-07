import { useState } from 'react'
import Landing from './pages/Landing'
import Book from './pages/Book'
import './styles.css'

const STORAGE_KEY = 'valentine_unlocked'

function getInitialUnlocked() {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(STORAGE_KEY) === 'true'
}

function App() {
  const [unlocked, setUnlocked] = useState(getInitialUnlocked)

  const handleUnlocked = () => {
    setUnlocked(true)
    window.localStorage.setItem(STORAGE_KEY, 'true')
  }

  const handleReset = () => {
    setUnlocked(false)
    window.localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <div className="app">
      {unlocked ? <Book onReset={handleReset} /> : <Landing onUnlocked={handleUnlocked} />}
    </div>
  )
}

export default App
