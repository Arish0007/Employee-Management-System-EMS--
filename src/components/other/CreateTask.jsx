import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

const CreateTask = () => {
  const { employees, addTask } = useContext(AuthContext)
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [assignTo, setAssignTo] = useState('')
  const [category, setCategory] = useState('')
  const [feedback, setFeedback] = useState('')
  const [error, setError] = useState(false)

  const submitHandler = (event) => {
    event.preventDefault()

    const employee = employees.find((item) => String(item.id) === assignTo)
    if (!employee) {
      setError(true)
      setFeedback('Select an employee before creating the assignment.')
      return
    }

    try {
      const wasAdded = addTask(employee.id, {
        active: false,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: taskTitle.trim(),
        taskDescription: taskDescription.trim(),
        taskDate,
        category: category.trim()
      })

      if (!wasAdded) {
        setError(true)
        setFeedback('The selected employee could not be found. Please try again.')
        return
      }
    } catch (saveError) {
      console.error('Unable to create task:', saveError)
      setError(true)
      setFeedback('Could not save the assignment. Check browser storage and try again.')
      return
    }

    setTaskTitle('')
    setTaskDescription('')
    setTaskDate('')
    setAssignTo('')
    setCategory('')
    setError(false)
    setFeedback('Assignment created.')
  }

  return (
    <section className="panel create-task-panel">
      <div className="section-heading">
        <div>
          <h2 className="section-title">Create an assignment</h2>
          <p className="section-description">Add the details and choose a teammate to assign it to.</p>
        </div>
      </div>

      <form onSubmit={submitHandler} className="create-task-form">
        <div className="create-task-fields">
          <div className="form-field">
            <label className="field-label" htmlFor="task-title">Task title</label>
            <input
              id="task-title"
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
              className="form-input"
              type="text"
              placeholder="e.g. Prepare monthly report"
              required
            />

            <label className="field-label" htmlFor="task-date">Due date</label>
            <input
              id="task-date"
              value={taskDate}
              onChange={(event) => setTaskDate(event.target.value)}
              className="form-input"
              type="date"
              required
            />

            <label className="field-label" htmlFor="assign-to">Assign to</label>
            <select
              id="assign-to"
              value={assignTo}
              onChange={(event) => setAssignTo(event.target.value)}
              className="form-input form-select"
              required
            >
              <option value="" disabled>
                Assign To
              </option>
              {employees.filter((employee) => employee.active !== false).map((employee) => (
                <option key={employee.id} value={String(employee.id)}>
                  {employee.firstName}
                </option>
              ))}
            </select>

            <label className="field-label" htmlFor="task-category">Category</label>
            <input
              id="task-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="form-input"
              type="text"
              placeholder="e.g. Design"
              required
            />
          </div>

          <div className="form-field description-field">
            <label className="field-label" htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              value={taskDescription}
              onChange={(event) => setTaskDescription(event.target.value)}
              className="form-input form-textarea"
              placeholder="Add a few details to help your teammate get started..."
              required
            />
            <div className="create-task-actions">
              <button
                type="submit"
                className="primary-button"
              >
                Create assignment
              </button>
            </div>
          </div>
        </div>
      </form>
      {feedback && (
        <p className={error ? 'form-feedback form-feedback-error' : 'form-feedback'} role={error ? 'alert' : 'status'}>
          {feedback}
        </p>
      )}
    </section>
  )
}

export default CreateTask
