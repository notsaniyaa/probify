import { useState } from 'react'
import { bernoulli, combination } from '../utils/math'

function Bernoulli({ onBack }) {
  const [n, setN] = useState('')
  const [k, setK] = useState('')
  const [p, setP] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function clearResult() {
    setResult(null)
    setError('')
  }

  function calculate() {
    if (n === '' || k === '' || p === '') {
      setError('Please enter n, k and p.')
      setResult(null)
      return
    }

    const nValue = Number(n)
    const kValue = Number(k)
    const pValue = Number(p)

    if (!Number.isInteger(nValue) || !Number.isInteger(kValue)) {
      setError('n and k must be whole numbers.')
      setResult(null)
      return
    }

    if (nValue < 0 || kValue < 0) {
      setError('n and k cannot be negative.')
      setResult(null)
      return
    }

    if (kValue > nValue) {
      setError('k cannot be greater than n.')
      setResult(null)
      return
    }

    if (!Number.isFinite(pValue) || pValue < 0 || pValue > 1) {
      setError('Probability p must be between 0 and 1.')
      setResult(null)
      return
    }

    const answer = bernoulli(nValue, kValue, pValue)

    setResult(answer)
    setError('')
  }

  return (
    <main className="calculator-page">
      <button className="back-button" onClick={onBack}>
        ← Back to calculators
      </button>

      <section className="calculator-header">
        <div className="calculator-icon">Bₙ</div>

        <p className="eyebrow">BERNOULLI TRIALS</p>

        <h1>Binomial Probability</h1>

        <p>
          Calculate the probability of exactly k successes
          in n independent trials.
        </p>
      </section>

      <section className="calculator-box">
        <div className="formula-main">
          <strong>P(X = k)</strong> = C(n, k) × pᵏ × (1 − p)ⁿ⁻ᵏ
        </div>

        <div className="bernoulli-input-grid">
          <label>
            Number of trials (n)
            <span className="input-description">
              Total number of experiments
            </span>

            <input
              type="number"
              min="0"
              step="1"
              value={n}
              onChange={(event) => {
                setN(event.target.value)
                clearResult()
              }}
              placeholder="e.g. 10"
            />
          </label>

          <label>
            Number of successes (k)
            <span className="input-description">
              Exact number of desired successes
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
              placeholder="e.g. 3"
            />
          </label>

          <label>
            Success probability (p)
            <span className="input-description">
              Probability in one trial
            </span>

            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={p}
              onChange={(event) => {
                setP(event.target.value)
                clearResult()
              }}
              placeholder="e.g. 0.5"
            />
          </label>
        </div>

        <button
          className="calculate-button"
          onClick={calculate}
        >
          Calculate Binomial Probability
        </button>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {result !== null && (
          <div className="result-box">
            <p className="result-label">
              PROBABILITY OF EXACTLY {k} SUCCESSES
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
                Formula: P(X = k) = C(n, k) × pᵏ ×
                (1 − p)ⁿ⁻ᵏ
              </p>

              <p>
                Substitute: P(X = {k}) = C({n}, {k}) ×
                {p}^{k} × (1 − {p})^({n} − {k})
              </p>

              <p>
                C({n}, {k}) = {combination(Number(n), Number(k))}
              </p>

              <p>
                1 − p = {Number((1 - Number(p)).toFixed(6))}
              </p>

              <p>
                P(X = {k}) = {combination(Number(n), Number(k))}
                {' × '}
                {p}^{k}
                {' × '}
                {Number((1 - Number(p)).toFixed(6))}
                ^{Number(n) - Number(k)}
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

export default Bernoulli