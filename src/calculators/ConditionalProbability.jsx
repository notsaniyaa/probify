import { useState } from 'react'
import { conditionalProbability } from '../utils/math'

function ConditionalProbability({ onBack }) {
  const [intersection, setIntersection] = useState('')
  const [probabilityB, setProbabilityB] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function calculate() {
    const intersectionValue = Number(intersection)
    const probabilityBValue = Number(probabilityB)

    if (intersection === '' || probabilityB === '') {
      setError('Please enter both probabilities.')
      setResult(null)
      return
    }

    if (
      intersectionValue < 0 ||
      intersectionValue > 1 ||
      probabilityBValue < 0 ||
      probabilityBValue > 1
    ) {
      setError('Probabilities must be between 0 and 1.')
      setResult(null)
      return
    }

    if (probabilityBValue === 0) {
      setError('P(B) cannot be zero.')
      setResult(null)
      return
    }

    if (intersectionValue > probabilityBValue) {
      setError('P(A ∩ B) cannot be greater than P(B).')
      setResult(null)
      return
    }

    const answer = conditionalProbability(
      intersectionValue,
      probabilityBValue
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
        <div className="calculator-icon">A|B</div>

        <p className="eyebrow">CONDITIONAL PROBABILITY</p>

        <h1>Conditional Probability</h1>

        <p>
          Find the probability of event A occurring given that
          event B has already occurred.
        </p>
      </section>

      <section className="calculator-box">
        <div className="formula-main">
          <strong>P(A|B)</strong> = P(A ∩ B) / P(B)
        </div>

        <div className="input-grid">
          <label>
            P(A ∩ B)
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={intersection}
              onChange={(event) => {
                setIntersection(event.target.value)
                clearResult()
              }}
              placeholder="e.g. 0.2"
            />
          </label>

          <label>
            P(B)
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={probabilityB}
              onChange={(event) => {
                setProbabilityB(event.target.value)
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
          Calculate Conditional Probability
        </button>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {result !== null && (
          <div className="result-box">
            <p className="result-label">
              CONDITIONAL PROBABILITY
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
                Formula: P(A|B) = P(A ∩ B) / P(B)
              </p>

              <p>
                Substitute: P(A|B) = {intersection} / {probabilityB}
              </p>

              <p>
                P(A|B) = {Number(result.toFixed(6))}
              </p>

              <p>
                Percentage = {Number(result.toFixed(6))} × 100%
              </p>

              <p className="final-step">
                Therefore, P(A|B) = {(result * 100).toFixed(2)}%
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default ConditionalProbability