import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import TaskActivity from '../taskslist/TaskActivity'

const statusLabel = (task) => {
  if (task.rejected) return 'Rejected'
  if (task.completed) return 'Completed'
  if (task.failed) return 'Needs attention'
  if (task.active) return 'In progress'
  return 'New'
}

const TaskCenter = () => {
  const { employees, editTask, deleteTask } = useContext(AuthContext)
  const [editing, setEditing] = useState(null)
  const [message, setMessage] = useState('')

  const startEdit = (employee, task) => {
    setEditing({
      employeeId: String(employee.id),
      taskId: String(task.id),
      assignedTo: String(employee.id),
      title: task.taskTitle,
      description: task.taskDescription,
      dueDate: task.taskDate,
      category: task.category
    })
    setMessage('')
  }

  const saveTask = (event) => {
    event.preventDefault()
    const { employeeId, taskId, assignedTo, title, description, dueDate, category } = editing
    const saved = editTask(employeeId, taskId, assignedTo, {
      taskTitle: title.trim(),
      taskDescription: description.trim(),
      taskDate: dueDate,
      category: category.trim()
    })

    if (!saved) {
      setMessage('Could not save the task. Check the employee and try again.')
      return
    }
    setEditing(null)
    setMessage('Task updated.')
  }

  const removeTask = (employee, task) => {
    if (!window.confirm(`Remove “${task.taskTitle}”?`)) return
    if (deleteTask(employee.id, task.id)) setMessage('Task removed.')
  }

  const tasks = employees.flatMap((employee) =>
    employee.tasks.map((task) => ({ employee, task }))
  )

  return (
    <section className="panel task-center-panel">
      <div className="section-heading">
        <div>
          <h2 className="section-title">All tasks</h2>
          <p className="section-description">Review, update, or remove assignments for the whole team.</p>
        </div>
        <span className="task-total">{tasks.length} tasks</span>
      </div>

      {message && <p className="form-feedback" role="status">{message}</p>}
      {tasks.length === 0 ? (
        <p className="empty-tasks">No tasks yet. Create an assignment above.</p>
      ) : (
        <div className="admin-task-list">
          {tasks.map(({ employee, task }) => (
            <article className="admin-task-item" key={`${employee.id}-${task.id}`}>
              {editing?.taskId === String(task.id) ? (
                <form className="task-edit-form" onSubmit={saveTask}>
                  <label className="form-field">
                    <span className="field-label">Title</span>
                    <input className="form-input" value={editing.title} onChange={(event) => setEditing({ ...editing, title: event.target.value })} required />
                  </label>
                  <label className="form-field">
                    <span className="field-label">Description</span>
                    <textarea className="form-input" value={editing.description} onChange={(event) => setEditing({ ...editing, description: event.target.value })} required />
                  </label>
                  <div className="task-edit-fields">
                    <label className="form-field">
                      <span className="field-label">Due date</span>
                      <input className="form-input" type="date" value={editing.dueDate} onChange={(event) => setEditing({ ...editing, dueDate: event.target.value })} required />
                    </label>
                    <label className="form-field">
                      <span className="field-label">Category</span>
                      <input className="form-input" value={editing.category} onChange={(event) => setEditing({ ...editing, category: event.target.value })} required />
                    </label>
                    <label className="form-field">
                      <span className="field-label">Assign to</span>
                      <select className="form-input form-select" value={editing.assignedTo} onChange={(event) => setEditing({ ...editing, assignedTo: event.target.value })}>
                        {employees.filter((item) => item.active !== false || String(item.id) === editing.assignedTo).map((item) => (
                          <option key={item.id} value={String(item.id)}>
                            {item.firstName}{item.active === false ? ' (paused)' : ''}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="employee-row-actions">
                    <button type="submit" className="task-action-button action-primary">Save</button>
                    <button type="button" className="task-action-button action-subtle" onClick={() => setEditing(null)}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="admin-task-topline">
                    <span className={`task-status status-${task.completed ? 'complete' : task.failed ? 'failed' : task.active ? 'active' : 'new'}`}>
                      {statusLabel(task)}
                    </span>
                    <span className="admin-task-assignee">{employee.firstName} · Due {task.taskDate}</span>
                  </div>
                  <h3 className="task-card-title">{task.taskTitle}</h3>
                  <p className="admin-task-description">{task.taskDescription}</p>
                  <p className="admin-task-meta">{task.category}</p>
                  <div className="employee-row-actions">
                    <button type="button" className="task-action-button action-subtle" onClick={() => startEdit(employee, task)}>Edit / reassign</button>
                    <button type="button" className="task-action-button action-danger" onClick={() => removeTask(employee, task)}>Remove</button>
                  </div>
                  <TaskActivity task={task} employeeId={employee.id} employeeName={employee.firstName} role="admin" />
                </>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default TaskCenter
