import { useState } from 'react'
import { combination, permutation } from '../utils/math'

function Combinatorics({ onBack }) {
  const [mode, setMode] = useState('combination')
  const [n, setN] = useState('')
  const [r, setR] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function calculate() {
    const nValue = Number(n)
    const rValue = Number(r)

    if (n === '' || r === '') {
      setError('Please enter both n and r.')
      setResult(null)
      return
    }

    if (!Number.isInteger(nValue) || !Number.isInteger(rValue)) {
      setError('n and r must be whole numbers.')
      setResult(null)
      return
    }

    if (nValue < 0 || rValue < 0) {
      setError('n and r cannot be negative.')
      setResult(null)
      return
    }

    if (rValue > nValue) {
      setError('r cannot be greater than n.')
      setResult(null)
      return
    }

    const answer =
      mode === 'combination'
        ? combination(nValue, rValue)
        : permutation(nValue, rValue)

    setResult(answer)
    setError('')
  }

  function changeMode(newMode) {
    setMode(newMode)
    setResult(null)
    setError('')
  }

  return (
    <main className="calculator-page">
      <button className="back-button" onClick={onBack}>
        ← Back to calculators
      </button>

      <section className="calculator-header">
        <div className="calculator-icon">∑</div>

        <p className="eyebrow">COMBINATORICS</p>

        <h1>Permutations & Combinations</h1>

        <p>
          Calculate the number of ways to arrange or select objects.
        </p>
      </section>

      <section className="calculator-box">
        <div className="mode-selector">
          <button
            className={mode === 'combination' ? 'mode active' : 'mode'}
            onClick={() => changeMode('combination')}
          >
            Combination
            <span>Order does not matter</span>
          </button>

          <button
            className={mode === 'permutation' ? 'mode active' : 'mode'}
            onClick={() => changeMode('permutation')}
          >
            Permutation
            <span>Order matters</span>
          </button>
        </div>

        <div className="formula-main">
          {mode === 'combination' ? (
            <>
              <strong>C(n, r)</strong> = n! / (r! × (n − r)!)
            </>
          ) : (
            <>
              <strong>P(n, r)</strong> = n! / (n − r)!
            </>
          )}
        </div>

        <div className="input-grid">
          <label>
            Total objects (n)
            <input
              type="number"
              min="0"
              step="1"
              value={n}
              onChange={(event) => {
                setN(event.target.value)
                setResult(null)
                setError('')
              }}
              placeholder="e.g. 10"
            />
          </label>

          <label>
            Objects selected (r)
            <input
              type="number"
              min="0"
              step="1"
              value={r}
              onChange={(event) => {
                setR(event.target.value)
                setResult(null)
                setError('')
              }}
              placeholder="e.g. 3"
            />
          </label>
        </div>

        <button className="calculate-button" onClick={calculate}>
          Calculate
        </button>

        {error && <div className="error-message">{error}</div>}

        {result !== null && (
          <div className="result-box">
            <p className="result-label">RESULT</p>

            <div className="result-number">
              {result.toLocaleString()}
            </div>

            <div className="solution">
              <h3>Step-by-step solution</h3>

              {mode === 'combination' ? (
                <>
                  <p>
                    Formula: C(n, r) = n! / (r! × (n − r)!)
                  </p>

                  <p>
                    Substitute: C({n}, {r}) = {n}! / ({r}! × ({n} − {r})!)
                  </p>

                  <p>
                    C({n}, {r}) = {n}! / ({r}! × {Number(n) - Number(r)}!)
                  </p>

                  <p className="final-step">
                    Therefore, C({n}, {r}) = {result.toLocaleString()}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Formula: P(n, r) = n! / (n − r)!
                  </p>

                  <p>
                    Substitute: P({n}, {r}) = {n}! / ({n} − {r})!
                  </p>

                  <p>
                    P({n}, {r}) = {n}! / ({Number(n) - Number(r)})!
                  </p>

                  <p className="final-step">
                    Therefore, P({n}, {r}) = {result.toLocaleString()}
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default Combinatorics