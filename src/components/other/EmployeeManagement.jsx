import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

const EmployeeManagement = () => {
  const { employees, updateEmployee, toggleEmployeeActive, removeEmployee } = useContext(AuthContext)
  const [editingId, setEditingId] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState('')

  const startEdit = (employee) => {
    setEditingId(employee.id)
    setName(employee.firstName)
    setEmail(employee.email)
    setFeedback('')
  }

  const saveEdit = (event) => {
    event.preventDefault()
    const result = updateEmployee(editingId, { firstName: name, email })
    setFeedback(result.success ? 'Employee details updated.' : result.error)
    if (result.success) setEditingId(null)
  }

  const deleteEmployee = (employee) => {
    const confirmed = window.confirm(
      `Remove ${employee.firstName} and permanently delete all ${employee.tasks.length} assigned task(s)?`
    )
    if (!confirmed) return
    if (removeEmployee(employee.id)) setFeedback(`${employee.firstName} and their tasks were removed.`)
  }

  return (
    <section className="panel employee-management-panel">
      <div className="section-heading">
        <div>
          <h2 className="section-title">Employee accounts</h2>
          <p className="section-description">Edit employee details, pause access, or review task history.</p>
        </div>
        <span className="task-total">{employees.length} employees</span>
      </div>
      {feedback && <p className="form-feedback" role="status">{feedback}</p>}
      {employees.length === 0 ? (
        <p className="empty-tasks">No employees have been added yet.</p>
      ) : (
        <div className="employee-management-list">
          {employees.map((employee) => (
            <article className="employee-management-card" key={employee.id}>
              {editingId === employee.id ? (
                <form className="employee-edit-form" onSubmit={saveEdit}>
                  <label className="field-label" htmlFor={`employee-edit-name-${employee.id}`}>Name</label>
                  <input id={`employee-edit-name-${employee.id}`} className="form-input" value={name} onChange={(event) => setName(event.target.value)} required maxLength={80} />
                  <label className="field-label" htmlFor={`employee-edit-email-${employee.id}`}>Email</label>
                  <input id={`employee-edit-email-${employee.id}`} className="form-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                  <div className="employee-row-actions">
                    <button type="submit" className="task-action-button action-primary">Save changes</button>
                    <button type="button" className="task-action-button action-subtle" onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="employee-management-heading">
                    <span className="avatar">{employee.firstName?.charAt(0)?.toUpperCase() || '?'}</span>
                    <div>
                      <strong>{employee.firstName}</strong>
                      <span>{employee.email}</span>
                    </div>
                    <span className={`account-state ${employee.active === false ? 'account-state-paused' : ''}`}>
                      {employee.active === false ? 'Paused' : 'Active'}
                    </span>
                  </div>
                  <p className="employee-history">
                    {employee.tasks.length} tasks · {employee.taskNumber.completed} completed · {employee.taskNumber.failed} need attention
                    {employee.tasks.length > 0 && (
                      <span> · Recent: {employee.tasks.slice(-2).map((task) => task.taskTitle).join(', ')}</span>
                    )}
                  </p>
                  <div className="employee-row-actions">
                    <button type="button" className="task-action-button action-subtle" onClick={() => startEdit(employee)}>Edit details</button>
                    <button type="button" className="task-action-button action-subtle" onClick={() => toggleEmployeeActive(employee.id)}>
                      {employee.active === false ? 'Reactivate' : 'Pause access'}
                    </button>
                    <button type="button" className="task-action-button action-danger" onClick={() => deleteEmployee(employee)}>Remove</button>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default EmployeeManagement
