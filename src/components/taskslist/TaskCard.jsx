import TaskActivity from './TaskActivity'

const TaskCard = ({ task, employee, onStatusChange }) => {
  const status = task.completed ? 'complete' : task.failed ? 'failed' : task.active ? 'active' : 'new'
  const label = task.rejected
    ? 'Rejected'
    : task.completed
      ? 'Completed'
      : task.failed
        ? 'Needs attention'
        : task.active
          ? 'In progress'
          : 'New'

  return (
    <article className={`task-card task-card-${status}`}>
      <div className="task-card-meta">
        <span className={`task-status status-${status}`}>{label}</span>
        <time dateTime={task.taskDate}>{task.taskDate}</time>
      </div>
      <h3 className="task-card-title">{task.taskTitle}</h3>
      <p className="task-card-description">{task.taskDescription}</p>
      <div className="task-card-footer">
        <span className="task-category">{task.category}</span>
        <div className="task-actions">
          {task.newTask && (
            <button type="button" className="task-action-button action-primary" onClick={() => onStatusChange('active')}>
              Accept task
            </button>
          )}
          {task.active && (
            <button type="button" className="task-action-button action-danger" onClick={() => onStatusChange('failed')}>
              Mark as failed
            </button>
          )}
        </div>
        <TaskActivity
          task={task}
          employeeId={employee.id}
          employeeName={employee.firstName}
          role="employee"
          onComplete={task.active ? (note) => onStatusChange('completed', note) : null}
          onReject={task.newTask ? (note) => onStatusChange('failed', note) : null}
        />
      </div>
    </article>
  )
}

export default TaskCard
