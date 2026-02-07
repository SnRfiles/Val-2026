import DateGate from '../components/DateGate'

type LandingProps = {
  onUnlocked: () => void
}

export default function Landing({ onUnlocked }: LandingProps) {
  return (
    <div className="page landing">
      <div className="floating-hearts" aria-hidden="true">
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
        <span>❤</span>
      </div>

      <div className="card">
        <h1>From me to you (:</h1>
        <p className="subtitle">Enter our birthdays to unlock.</p>
        <DateGate onSuccess={onUnlocked} />
      </div>
    </div>
  )
}
