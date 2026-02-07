type BookProps = {
  onReset: () => void
}

export default function Book({ onReset }: BookProps) {
  return (
    <div className="page book">
      <div className="card">
        <h1>Coming soon</h1>
        <p className="subtitle">The next chapter is on its way.</p>
        <button type="button" className="btn btn--primary" onClick={onReset}>
          Back to calendar
        </button>
      </div>
    </div>
  )
}
