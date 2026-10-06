// Factorial: n! = n × (n - 1) × ... × 1
export function factorial(n) {
  if (n < 0 || !Number.isInteger(n)) {
    return null
  }

  if (n === 0 || n === 1) {
    return 1
  }

  let result = 1

  for (let i = 2; i <= n; i++) {
    result *= i
  }

  return result
}

// Permutation:
// P(n, r) = n! / (n - r)!
export function permutation(n, r) {
  if (
    !Number.isInteger(n) ||
    !Number.isInteger(r) ||
    n < 0 ||
    r < 0 ||
    r > n
  ) {
    return null
  }

  return factorial(n) / factorial(n - r)
}

// Combination:
// C(n, r) = n! / (r! × (n - r)!)
export function combination(n, r) {
  if (
    !Number.isInteger(n) ||
    !Number.isInteger(r) ||
    n < 0 ||
    r < 0 ||
    r > n
  ) {
    return null
  }

  return factorial(n) / (factorial(r) * factorial(n - r))
}

// Basic Probability:
// P(A) = favorable outcomes / total outcomes
export function basicProbability(favorable, total) {
  if (
    !Number.isInteger(favorable) ||
    !Number.isInteger(total) ||
    favorable < 0 ||
    total <= 0 ||
    favorable > total
  ) {
    return null
  }

  return favorable / total
}

// Conditional Probability:
// P(A|B) = P(A ∩ B) / P(B)
export function conditionalProbability(intersection, probabilityB) {
  if (
    intersection < 0 ||
    intersection > 1 ||
    probabilityB <= 0 ||
    probabilityB > 1 ||
    intersection > probabilityB
  ) {
    return null
  }

  return intersection / probabilityB
}

// Bayes' Theorem:
//
// P(A|B) =
// P(B|A) × P(A)
// -------------------------------
// P(B|A) × P(A) + P(B|¬A) × P(¬A)
//
// where P(¬A) = 1 - P(A)

export function bayesTheorem(
  probabilityA,
  probabilityBGivenA,
  probabilityBGivenNotA
) {
  if (
    probabilityA < 0 ||
    probabilityA > 1 ||
    probabilityBGivenA < 0 ||
    probabilityBGivenA > 1 ||
    probabilityBGivenNotA < 0 ||
    probabilityBGivenNotA > 1
  ) {
    return null
  }

  const probabilityNotA = 1 - probabilityA

  const numerator =
    probabilityBGivenA * probabilityA

  const denominator =
    probabilityBGivenA * probabilityA +
    probabilityBGivenNotA * probabilityNotA

  if (denominator === 0) {
    return null
  }

  return numerator / denominator
}

// Bernoulli Trials / Binomial Probability:
// P(X = k) = C(n, k) × p^k × (1 - p)^(n - k)
export function bernoulli(n, k, p) {
  if (
    !Number.isInteger(n) ||
    !Number.isInteger(k) ||
    n < 0 ||
    k < 0 ||
    k > n ||
    p < 0 ||
    p > 1
  ) {
    return null
  }

  return (
    combination(n, k) *
    Math.pow(p, k) *
    Math.pow(1 - p, n - k)
  )
}

// Poisson Distribution:
// P(X = k) = e^(-λ) × λ^k / k!
export function poisson(lambda, k) {
  if (
    !Number.isFinite(lambda) ||
    lambda <= 0 ||
    !Number.isInteger(k) ||
    k < 0
  ) {
    return null
  }

  return (
    Math.exp(-lambda) *
    Math.pow(lambda, k) /
    factorial(k)
  )
}