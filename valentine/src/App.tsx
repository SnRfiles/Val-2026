import { useEffect, useRef, useState } from 'react'
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
  const [transitionPhase, setTransitionPhase] = useState<'idle' | 'out' | 'in'>('idle')
  const transitionTimers = useRef<{ swap: number; end: number } | null>(null)
  const transitionOutMs = 350
  const transitionInMs = 450

  const handleUnlocked = () => {
    if (transitionPhase !== 'idle' || unlocked) return
    setTransitionPhase('out')
    const swap = window.setTimeout(() => {
      setUnlocked(true)
      window.localStorage.setItem(STORAGE_KEY, 'true')
      setTransitionPhase('in')
    }, transitionOutMs)
    const end = window.setTimeout(() => {
      setTransitionPhase('idle')
    }, transitionOutMs + transitionInMs)
    transitionTimers.current = { swap, end }
  }

  const handleReset = () => {
    if (transitionTimers.current) {
      window.clearTimeout(transitionTimers.current.swap)
      window.clearTimeout(transitionTimers.current.end)
      transitionTimers.current = null
    }
    setTransitionPhase('idle')
    setUnlocked(false)
    window.localStorage.removeItem(STORAGE_KEY)
  }

  useEffect(() => {
    return () => {
      if (transitionTimers.current) {
        window.clearTimeout(transitionTimers.current.swap)
        window.clearTimeout(transitionTimers.current.end)
        transitionTimers.current = null
      }
    }
  }, [])

  return (
    <div
      className={[
        'app',
        transitionPhase === 'out' ? 'is-transitioning-out' : '',
        transitionPhase === 'in' ? 'is-transitioning-in' : ''
      ]
        .join(' ')
        .trim()}
    >
      <div className="app-view">
        {unlocked ? <Book onReset={handleReset} /> : <Landing onUnlocked={handleUnlocked} />}
      </div>
      <div className="transition-overlay" aria-hidden="true" />
    </div>
  )
}

export default App
