import './App.css'
import { useState } from 'react'

import Combinatorics from './calculators/Combinatorics'
import Probability from './calculators/Probability'
import ConditionalProbability from './calculators/ConditionalProbability'
import Bayes from './calculators/Bayes'
import Bernoulli from './calculators/Bernoulli'
import Poisson from './calculators/Poisson'

const topics = [
  {
    icon: '∑',
    title: 'Combinatorics',
    description: 'Calculate permutations and combinations.',
    formulas: 'nPr  •  nCr',
  },
  {
    icon: 'P',
    title: 'Basic Probability',
    description: 'Find the probability of an event.',
    formulas: 'P(A) = favorable / total',
  },
  {
    icon: 'A|B',
    title: 'Conditional Probability',
    description: 'Calculate probability given another event.',
    formulas: 'P(A|B)',
  },
  {
    icon: 'B',
    title: "Bayes' Theorem",
    description: 'Update probabilities using new evidence.',
    formulas: 'P(A|B)',
  },
  {
    icon: 'Bₙ',
    title: 'Bernoulli Trials',
    description: 'Find the probability of exactly k successes.',
    formulas: 'P(X = k)',
  },
  {
    icon: 'λ',
    title: 'Poisson Distribution',
    description: 'Model the number of events in an interval.',
    formulas: 'P(X = k)',
  },
]

const calculatorComponents = {
  Combinatorics,
  'Basic Probability': Probability,
  'Conditional Probability': ConditionalProbability,
  "Bayes' Theorem": Bayes,
  'Bernoulli Trials': Bernoulli,
  'Poisson Distribution': Poisson,
}

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <div className="logo-mark">P</div>
        <span>Probify</span>
      </div>

      <div className="course-label">
        Theory of Probability
      </div>
    </header>
  )
}

function App() {
  const [activeCalculator, setActiveCalculator] = useState(null)

  const ActiveCalculator =
    calculatorComponents[activeCalculator]

  if (ActiveCalculator) {
    return (
      <div className="app">
        <Navbar />

        <ActiveCalculator
          onBack={() => {
            setActiveCalculator(null)

            setTimeout(() => {
              window.scrollTo(0, 0)
            }, 0)
          }}
        />
      </div>
    )
  }

  return (
    <div className="app">
      <Navbar />

      <main>
        <section className="hero">
          <div className="hero-badge">
            Probability made simple
          </div>

          <h1>
            Calculate. Understand.
            <span> Learn probability.</span>
          </h1>

          <p>
            Interactive probability calculators with formulas
            and step-by-step solutions.
          </p>

          <a
            className="start-button"
            href="#calculators"
          >
            Explore calculators ↓
          </a>
        </section>

        <section
          className="calculators"
          id="calculators"
        >
          <div className="section-heading">
            <p className="eyebrow">
              CALCULATORS
            </p>

            <h2>Choose a topic</h2>

            <p>
              Select a probability topic to start calculating
              and learning.
            </p>
          </div>

          <div className="cards-grid">
            {topics.map((topic, index) => (
              <button
                className="topic-card"
                key={topic.title}
                onClick={() => {
                  setActiveCalculator(topic.title)
                  window.scrollTo(0, 0)
                }}
              >
                <div className="card-top">
                  <div className="topic-icon">
                    {topic.icon}
                  </div>

                  <span className="card-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3>{topic.title}</h3>

                <p>{topic.description}</p>

                <div className="formula-preview">
                  {topic.formulas}
                </div>

                <div className="open-calculator">
                  Open calculator <span>→</span>
                </div>
              </button>
            ))}
          </div>
        </section>
        <section className="about-section">
  <div className="about-content">
    <p className="eyebrow">ABOUT THE PROJECT</p>

    <h2>Learn probability through calculation</h2>

    <p className="about-description">
      Probify is an interactive educational calculator created
      as an individual Theory of Probability course project.
      It combines mathematical formulas, automatic calculations,
      input validation, and step-by-step explanations.
    </p>

    <div className="about-features">
      <div className="about-feature">
        <span>01</span>
        <h3>6 probability topics</h3>
        <p>
          From basic probability and combinatorics to Bayes,
          Bernoulli trials, and the Poisson distribution.
        </p>
      </div>

      <div className="about-feature">
        <span>02</span>
        <h3>Step-by-step solutions</h3>
        <p>
          Every calculation shows the formula, substituted
          values, and the final result.
        </p>
      </div>

      <div className="about-feature">
        <span>03</span>
        <h3>Input validation</h3>
        <p>
          The application checks user input and prevents
          mathematically invalid calculations.
        </p>
      </div>
    </div>

    <div className="tech-stack">
      <span>React</span>
      <span>JavaScript</span>
      <span>CSS</span>
      <span>Vite</span>
    </div>
  </div>
</section>
      </main>

      <footer>
        <div className="footer-logo">
          Probify
        </div>

        <p>
          Probability & Statistics Calculator
        </p>

        <p>
          Individual Course Project
        </p>
      </footer>
    </div>
  )
}

export default App