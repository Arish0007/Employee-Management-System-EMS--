import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import TaskCard from './TaskCard'

const TaskList = ({ data }) => {
  const { updateTaskStatus } = useContext(AuthContext)

  if (data.tasks.length === 0) {
    return <p className="empty-tasks">No assignments yet. New tasks will show up here.</p>
  }

  return (
    <div className="task-grid">
      {data.tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          employee={data}
          onStatusChange={(status, note) => updateTaskStatus(data.id, task.id, status, note)}
        />
      ))}
    </div>
  )
}

export default TaskList
