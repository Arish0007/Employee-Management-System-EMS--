import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

const CreateEmployee = () => {
  const { addEmployee } = useContext(AuthContext)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const submitHandler = (event) => {
    event.preventDefault()
    const result = addEmployee({ firstName, email, password })

    if (!result.success) {
      setError(true)
      setMessage(result.error)
      return
    }

    setFirstName('')
    setEmail('')
    setPassword('')
    setError(false)
    setMessage(`${result.employee.firstName} can now sign in and receive assignments.`)
  }

  return (
    <section className="panel create-employee-panel">
      <div className="section-heading">
        <div>
          <h2 className="section-title">Add an employee</h2>
          <p className="section-description">Create an account so they can sign in and receive tasks.</p>
        </div>
      </div>

      <form onSubmit={submitHandler} className="employee-form">
        <div className="form-field">
          <label className="field-label" htmlFor="employee-name">Full name</label>
          <input
            id="employee-name"
            className="form-input"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            autoComplete="name"
            maxLength={80}
            required
          />
        </div>
        <div className="form-field">
          <label className="field-label" htmlFor="employee-email">Email address</label>
          <input
            id="employee-email"
            className="form-input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div className="form-field">
          <label className="field-label" htmlFor="employee-password">Temporary password</label>
          <input
            id="employee-password"
            className="form-input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            minLength={3}
            required
          />
        </div>
        <button type="submit" className="primary-button employee-submit">
          Create account
        </button>
      </form>
      {message && (
        <p className={error ? 'form-feedback form-feedback-error' : 'form-feedback'} role={error ? 'alert' : 'status'}>
          {message}
        </p>
      )}
    </section>
  )
}

export default CreateEmployee
