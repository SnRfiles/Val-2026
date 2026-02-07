import { useEffect, useMemo, useRef, useState } from 'react'
import Calendar from './Calendar'
import {
  HER_BDAY,
  MY_BDAY,
  formatISODate,
  isSameISO,
  parseISODate,
  toISODate,
} from '../utils/dates'

type DateGateProps = {
  onSuccess: () => void
}

type ActiveField = 'mine' | 'yours'

export default function DateGate({ onSuccess }: DateGateProps) {
  const [myDate, setMyDate] = useState('')
  const [herDate, setHerDate] = useState('')
  const [activeField, setActiveField] = useState<ActiveField>('mine')
  const [error, setError] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [lockedOut, setLockedOut] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  const canSubmit = Boolean(myDate && herDate)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const activeDate = activeField === 'mine' ? myDate : herDate
  const selectedDate = useMemo(() => parseISODate(activeDate), [activeDate])

  const handleSelectDate = (date: Date) => {
    if (lockedOut) return
    const iso = toISODate(date)
    if (activeField === 'mine') {
      setMyDate(iso)
    } else {
      setHerDate(iso)
    }
    setError(null)
  }

  const handleUnlock = () => {
    if (!canSubmit || isUnlocked || lockedOut) return

    const matches = isSameISO(myDate, MY_BDAY) && isSameISO(herDate, HER_BDAY)
    if (!matches) {
      const nextAttempts = attempts + 1
      setAttempts(nextAttempts)
      if (nextAttempts === 1) {
        setError('Are you sure??')
      } else if (nextAttempts === 2) {
        setError("I can't believe you forgot")
      } else {
        setError('Must be the wrong man 💔')
        setLockedOut(true)
      }
      setIsUnlocked(false)
      return
    }

    setError(null)
    setIsUnlocked(true)
    timeoutRef.current = window.setTimeout(() => {
      onSuccess()
    }, 600)
  }

  return (
    <div className="date-gate">
      <div className="date-gate__inputs">
        <label className="date-input">
          <div className="date-input__header">
            <span>My birthday</span>
          </div>
          <input
            type="text"
            value={formatISODate(myDate)}
            placeholder="MM/DD/YYYY"
            inputMode="none"
            readOnly
            onFocus={() => {
              setActiveField('mine')
            }}
            onClick={() => {
              setActiveField('mine')
            }}
            disabled={lockedOut}
          />
        </label>

        <label className="date-input">
          <div className="date-input__header">
            <span>Your birthday</span>
          </div>
          <input
            type="text"
            value={formatISODate(herDate)}
            placeholder="MM/DD/YYYY"
            inputMode="none"
            readOnly
            onFocus={() => {
              setActiveField('yours')
            }}
            onClick={() => {
              setActiveField('yours')
            }}
            disabled={lockedOut}
          />
        </label>
      </div>

      <div className="date-gate__calendar">
        <div className="date-gate__hint">Pick a date from the calendar.</div>
        <Calendar
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
          disabled={lockedOut}
        />
      </div>

      {error && (
        <p className="date-gate__error" role="alert">
          {error}
        </p>
      )}

      <button
        type="button"
        className={['btn', 'btn--primary', isUnlocked ? 'is-unlocked' : ''].join(' ')}
        onClick={handleUnlock}
        disabled={!canSubmit || isUnlocked || lockedOut}
      >
        {isUnlocked ? 'Unlocked!' : 'Unlock'}
      </button>
    </div>
  )
}
