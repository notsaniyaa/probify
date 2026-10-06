import { useState } from 'react'
import { basicProbability } from '../utils/math'

function Probability({ onBack }) {
  const [favorable, setFavorable] = useState('')
  const [total, setTotal] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function calculate() {
    const favorableValue = Number(favorable)
    const totalValue = Number(total)

    if (favorable === '' || total === '') {
      setError('Please enter both values.')
      setResult(null)
      return
    }

    if (
      !Number.isInteger(favorableValue) ||
      !Number.isInteger(totalValue)
    ) {
      setError('The number of outcomes must be a whole number.')
      setResult(null)
      return
    }

    if (favorableValue < 0) {
      setError('Favorable outcomes cannot be negative.')
      setResult(null)
      return
    }

    if (totalValue <= 0) {
      setError('Total outcomes must be greater than zero.')
      setResult(null)
      return
    }

    if (favorableValue > totalValue) {
      setError(
        'Favorable outcomes cannot be greater than total outcomes.'
      )
      setResult(null)
      return
    }

    const answer = basicProbability(
      favorableValue,
      totalValue
    )

    setResult(answer)
    setError('')
  }

  function clearResult() {
    setResult(null)
    setError('')
  }

  return (
    <main className="calculator-page">
      <button className="back-button" onClick={onBack}>
        ← Back to calculators
      </button>

      <section className="calculator-header">
        <div className="calculator-icon">P</div>

        <p className="eyebrow">BASIC PROBABILITY</p>

        <h1>Probability of an Event</h1>

        <p>
          Calculate how likely an event is to occur based on
          favorable and total possible outcomes.
        </p>
      </section>

      <section className="calculator-box">
        <div className="formula-main">
          <strong>P(A)</strong> = Favorable outcomes / Total outcomes
        </div>

        <div className="input-grid">
          <label>
            Favorable outcomes
            <input
              type="number"
              min="0"
              step="1"
              value={favorable}
              onChange={(event) => {
                setFavorable(event.target.value)
                clearResult()
              }}
              placeholder="e.g. 3"
            />
          </label>

          <label>
            Total outcomes
            <input
              type="number"
              min="1"
              step="1"
              value={total}
              onChange={(event) => {
                setTotal(event.target.value)
                clearResult()
              }}
              placeholder="e.g. 10"
            />
          </label>
        </div>

        <button
          className="calculate-button"
          onClick={calculate}
        >
          Calculate Probability
        </button>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {result !== null && (
          <div className="result-box">
            <p className="result-label">PROBABILITY</p>

            <div className="result-number">
              {Number(result.toFixed(6))}
            </div>

            <div className="probability-percentage">
              {(result * 100).toFixed(2)}%
            </div>

            <div className="solution">
              <h3>Step-by-step solution</h3>

              <p>
                Formula: P(A) = Favorable outcomes / Total outcomes
              </p>

              <p>
                Substitute: P(A) = {favorable} / {total}
              </p>

              <p>
                P(A) = {Number(result.toFixed(6))}
              </p>

              <p>
                Percentage = {Number(result.toFixed(6))} × 100%
              </p>

              <p className="final-step">
                Therefore, P(A) = {(result * 100).toFixed(2)}%
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default Probability
