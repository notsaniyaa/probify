import { useState } from 'react'
import { poisson, factorial } from '../utils/math'

function Poisson({ onBack }) {
  const [lambda, setLambda] = useState('')
  const [k, setK] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function clearResult() {
    setResult(null)
    setError('')
  }

  function calculate() {
    if (lambda === '' || k === '') {
      setError('Please enter λ and k.')
      setResult(null)
      return
    }

    const lambdaValue = Number(lambda)
    const kValue = Number(k)

    if (!Number.isFinite(lambdaValue) || lambdaValue <= 0) {
      setError('λ must be a number greater than zero.')
      setResult(null)
      return
    }

    if (!Number.isInteger(kValue) || kValue < 0) {
      setError('k must be a non-negative whole number.')
      setResult(null)
      return
    }

    const answer = poisson(lambdaValue, kValue)

    setResult(answer)
    setError('')
  }

  return (
    <main className="calculator-page">
      <button className="back-button" onClick={onBack}>
        ← Back to calculators
      </button>

      <section className="calculator-header">
        <div className="calculator-icon">λ</div>

        <p className="eyebrow">POISSON DISTRIBUTION</p>

        <h1>Poisson Probability</h1>

        <p>
          Calculate the probability of exactly k events occurring
          in an interval when the average event rate is known.
        </p>
      </section>

      <section className="calculator-box">
        <div className="formula-main">
          <strong>P(X = k)</strong> = e⁻λ × λᵏ / k!
        </div>

        <div className="input-grid">
          <label>
            Average rate (λ)
            <span className="input-description">
              Average number of events per interval
            </span>

            <input
              type="number"
              min="0"
              step="0.01"
              value={lambda}
              onChange={(event) => {
                setLambda(event.target.value)
                clearResult()
              }}
              placeholder="e.g. 3"
            />
          </label>

          <label>
            Number of events (k)
            <span className="input-description">
              Exact number of events
            </span>

            <input
              type="number"
              min="0"
              step="1"
              value={k}
              onChange={(event) => {
                setK(event.target.value)
                clearResult()
              }}
              placeholder="e.g. 2"
            />
          </label>
        </div>

        <button
          className="calculate-button"
          onClick={calculate}
        >
          Calculate Poisson Probability
        </button>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {result !== null && (
          <div className="result-box">
            <p className="result-label">
              PROBABILITY OF EXACTLY {k} EVENTS
            </p>

            <div className="result-number">
              {Number(result.toFixed(6))}
            </div>

            <div className="probability-percentage">
              {(result * 100).toFixed(2)}%
            </div>

            <div className="solution">
              <h3>Step-by-step solution</h3>

              <p>
                Formula: P(X = k) = e⁻λ × λᵏ / k!
              </p>

              <p>
                Substitute: P(X = {k}) =
                e^(-{lambda}) × {lambda}^{k} / {k}!
              </p>

              <p>
                {k}! = {factorial(Number(k))}
              </p>

              <p>
                e^(-{lambda}) ={' '}
                {Number(
                  Math.exp(-Number(lambda)).toFixed(6)
                )}
              </p>

              <p>
                {lambda}^{k} ={' '}
                {Number(
                  Math.pow(
                    Number(lambda),
                    Number(k)
                  ).toFixed(6)
                )}
              </p>

              <p>
                P(X = {k}) ={' '}
                {Number(
                  Math.exp(-Number(lambda)).toFixed(6)
                )}
                {' × '}
                {Number(
                  Math.pow(
                    Number(lambda),
                    Number(k)
                  ).toFixed(6)
                )}
                {' / '}
                {factorial(Number(k))}
              </p>

              <p className="final-step">
                Therefore, P(X = {k}) ={' '}
                {Number(result.toFixed(6))} ={' '}
                {(result * 100).toFixed(2)}%
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default Poisson