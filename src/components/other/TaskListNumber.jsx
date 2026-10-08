const stats = [
  { key: 'newTask', label: 'New tasks' },
  { key: 'active', label: 'In progress' },
  { key: 'completed', label: 'Completed' },
  { key: 'failed', label: 'Needs attention' }
]

const TaskListNumber = ({ data }) => (
  <section className="stats-grid" aria-label="Task summary">
    {stats.map((stat) => (
      <article key={stat.key} className="stat-card">
        <div className="stat-card-top">
          <span className="stat-label">{stat.label}</span>
        </div>
        <p className="stat-value">{data.taskNumber[stat.key]}</p>
      </article>
    ))}
  </section>
)

export default TaskListNumber
