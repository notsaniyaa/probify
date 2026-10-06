import { useState } from 'react'
import { bayesTheorem } from '../utils/math'

function Bayes({ onBack }) {
  const [probabilityA, setProbabilityA] = useState('')
  const [probabilityBGivenA, setProbabilityBGivenA] = useState('')
  const [probabilityBGivenNotA, setProbabilityBGivenNotA] = useState('')

  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function clearResult() {
    setResult(null)
    setError('')
  }

  function calculate() {
    if (
      probabilityA === '' ||
      probabilityBGivenA === '' ||
      probabilityBGivenNotA === ''
    ) {
      setError('Please enter all probabilities.')
      setResult(null)
      return
    }

    const a = Number(probabilityA)
    const bGivenA = Number(probabilityBGivenA)
    const bGivenNotA = Number(probabilityBGivenNotA)

    if (
      !Number.isFinite(a) ||
      !Number.isFinite(bGivenA) ||
      !Number.isFinite(bGivenNotA)
    ) {
      setError('Please enter valid numbers.')
      setResult(null)
      return
    }

    if (
      a < 0 ||
      a > 1 ||
      bGivenA < 0 ||
      bGivenA > 1 ||
      bGivenNotA < 0 ||
      bGivenNotA > 1
    ) {
      setError('All probabilities must be between 0 and 1.')
      setResult(null)
      return
    }

    const answer = bayesTheorem(
      a,
      bGivenA,
      bGivenNotA
    )

    if (answer === null) {
      setError(
        'The calculation is undefined because P(B) equals zero.'
      )
      setResult(null)
      return
    }

    setResult(answer)
    setError('')
  }

  const notA =
    probabilityA === ''
      ? null
      : 1 - Number(probabilityA)

  return (
    <main className="calculator-page">
      <button className="back-button" onClick={onBack}>
        ← Back to calculators
      </button>

      <section className="calculator-header">
        <div className="calculator-icon">B</div>

        <p className="eyebrow">BAYES' THEOREM</p>

        <h1>Bayes' Theorem</h1>

        <p>
          Update the probability of an event after receiving
          new evidence.
        </p>
      </section>

      <section className="calculator-box">
        <div className="formula-main bayes-formula">
          <strong>P(A|B)</strong>
          <span>=</span>

          <div className="fraction">
            <span>P(B|A) × P(A)</span>
            <span>
              P(B|A) × P(A) + P(B|¬A) × P(¬A)
            </span>
          </div>
        </div>

        <div className="bayes-input-grid">
          <label>
            P(A)
            <span className="input-description">
              Prior probability of A
            </span>

            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={probabilityA}
              onChange={(event) => {
                setProbabilityA(event.target.value)
                clearResult()
              }}
              placeholder="e.g. 0.10"
            />
          </label>

          <label>
            P(B|A)
            <span className="input-description">
              Probability of B when A occurs
            </span>

            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={probabilityBGivenA}
              onChange={(event) => {
                setProbabilityBGivenA(event.target.value)
                clearResult()
              }}
              placeholder="e.g. 0.80"
            />
          </label>

          <label>
            P(B|¬A)
            <span className="input-description">
              Probability of B when A does not occur
            </span>

            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={probabilityBGivenNotA}
              onChange={(event) => {
                setProbabilityBGivenNotA(event.target.value)
                clearResult()
              }}
              placeholder="e.g. 0.20"
            />
          </label>
        </div>

        {notA !== null &&
          Number.isFinite(notA) &&
          notA >= 0 &&
          notA <= 1 && (
            <div className="calculated-value">
              P(¬A) is calculated automatically:
              <strong> {Number(notA.toFixed(6))}</strong>
            </div>
          )}

        <button
          className="calculate-button"
          onClick={calculate}
        >
          Apply Bayes' Theorem
        </button>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {result !== null && (
          <div className="result-box">
            <p className="result-label">
              POSTERIOR PROBABILITY
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
                1. P(¬A) = 1 − P(A)
              </p>

              <p>
                P(¬A) = 1 − {probabilityA} ={' '}
                {Number((1 - Number(probabilityA)).toFixed(6))}
              </p>

              <p>
                2. Calculate P(B|A) × P(A)
              </p>

              <p>
                {probabilityBGivenA} × {probabilityA} ={' '}
                {Number(
                  (
                    Number(probabilityBGivenA) *
                    Number(probabilityA)
                  ).toFixed(6)
                )}
              </p>

              <p>
                3. Calculate P(B)
              </p>

              <p>
                P(B) = ({probabilityBGivenA} × {probabilityA})
                + ({probabilityBGivenNotA} ×{' '}
                {Number(
                  (1 - Number(probabilityA)).toFixed(6)
                )})
              </p>

              <p>
                P(B) ={' '}
                {Number(
                  (
                    Number(probabilityBGivenA) *
                      Number(probabilityA) +
                    Number(probabilityBGivenNotA) *
                      (1 - Number(probabilityA))
                  ).toFixed(6)
                )}
              </p>

              <p>
                4. Divide the numerator by P(B)
              </p>

              <p>
                P(A|B) = {Number(
                  (
                    Number(probabilityBGivenA) *
                    Number(probabilityA)
                  ).toFixed(6)
                )}{' '}
                /{' '}
                {Number(
                  (
                    Number(probabilityBGivenA) *
                      Number(probabilityA) +
                    Number(probabilityBGivenNotA) *
                      (1 - Number(probabilityA))
                  ).toFixed(6)
                )}
              </p>

              <p className="final-step">
                Therefore, P(A|B) ={' '}
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

export default Bayes