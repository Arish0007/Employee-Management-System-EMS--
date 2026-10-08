import { useState } from 'react'

const ThemeIcon = ({ theme }) => theme === 'dark' ? (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
  </svg>
) : (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.6 8.6 0 1 0 20.2 15.2Z" />
  </svg>
)

const Login = ({ handleLogin, errorMessage, theme, onToggleTheme }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (handleLogin(email, password)) {
      setEmail('')
      setPassword('')
      setError('')
      return
    }

    setError('Incorrect email or password.')
  }

  return (
    <main className="login-shell">
      <button
        type="button"
        onClick={onToggleTheme}
        className="theme-toggle login-theme-toggle"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        aria-pressed={theme === 'dark'}
      >
        <ThemeIcon theme={theme} />
      </button>
      <section className="login-card" aria-labelledby="login-title">
        <p className="login-brand">Employee management</p>
        <h1 id="login-title" className="login-title">Sign in</h1>
        <p className="login-subtitle">Enter your account details to continue.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label className="field-label" htmlFor="email">Email address</label>
          <input
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="form-input"
            type="email"
            placeholder="you@company.com"
            autoComplete="username"
          />

          <label className="field-label" htmlFor="password">Password</label>
          <input
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="form-input"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
          />

          {(errorMessage || error) && (
            <p className="form-error" role="alert">{errorMessage || error}</p>
          )}
          <button type="submit" className="primary-button login-button">
            Sign in
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login
