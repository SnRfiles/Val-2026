import { useEffect, useMemo, useState } from 'react'
import { toISODate } from '../utils/dates'

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const DEFAULT_YEAR = 2004
const YEAR_START = 1990
const YEAR_END = 2035

type CalendarProps = {
  selectedDate: Date | null
  onSelectDate: (date: Date) => void
  disabled?: boolean
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function addMonths(date: Date, delta: number) {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1)
}

function addDays(date: Date, delta: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + delta)
}

function getGridStart(date: Date) {
  const first = startOfMonth(date)
  return addDays(first, -first.getDay())
}

export default function Calendar({ selectedDate, onSelectDate, disabled = false }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() =>
    startOfMonth(selectedDate ?? new Date(DEFAULT_YEAR, 0, 1)),
  )

  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(startOfMonth(selectedDate))
    }
  }, [selectedDate])

  const days = useMemo(() => {
    const start = getGridStart(currentMonth)
    return Array.from({ length: 42 }, (_, index) => addDays(start, index))
  }, [currentMonth])

  const todayIso = toISODate(new Date())
  const selectedIso = selectedDate ? toISODate(selectedDate) : null

  const years = useMemo(() => {
    const list: number[] = []
    for (let year = YEAR_START; year <= YEAR_END; year += 1) {
      list.push(year)
    }
    return list
  }, [])

  const currentYear = currentMonth.getFullYear()

  return (
    <div className={['calendar', disabled ? 'is-disabled' : ''].join(' ')}>
      <div className="calendar__header">
        <button
          type="button"
          className="icon-btn"
          aria-label="Previous month"
          disabled={disabled}
          onClick={() => setCurrentMonth((prev) => addMonths(prev, -1))}
        >
          ‹
        </button>
        <div className="calendar__controls">
          <label className="calendar__label">
            <span className="sr-only">Month</span>
            <select
              className="calendar__select"
              value={currentMonth.getMonth()}
              onChange={(event) => {
                const month = Number(event.target.value)
                setCurrentMonth(new Date(currentYear, month, 1))
              }}
              disabled={disabled}
            >
              {MONTHS.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </label>
          <label className="calendar__label">
            <span className="sr-only">Year</span>
            <select
              className="calendar__select"
              value={currentYear}
              onChange={(event) => {
                const year = Number(event.target.value)
                setCurrentMonth(new Date(year, currentMonth.getMonth(), 1))
              }}
              disabled={disabled}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          type="button"
          className="icon-btn"
          aria-label="Next month"
          disabled={disabled}
          onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
        >
          ›
        </button>
      </div>

      <div className="calendar__weekdays">
        {WEEK_DAYS.map((day) => (
          <div key={day} className="calendar__weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar__grid">
        {days.map((date) => {
          const iso = toISODate(date)
          const isOutside = date.getMonth() !== currentMonth.getMonth()
          const isSelected = selectedIso === iso
          const isToday = todayIso === iso

          return (
            <button
              key={iso}
              type="button"
              className={[
                'calendar__day',
                isOutside ? 'is-outside' : '',
                isSelected ? 'is-selected' : '',
                isToday ? 'is-today' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-pressed={isSelected}
              disabled={disabled}
              onClick={() => onSelectDate(date)}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
