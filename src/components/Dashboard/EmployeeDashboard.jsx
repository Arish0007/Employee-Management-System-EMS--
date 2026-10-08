import Header from '../other/Header'
import TaskListNumber from '../other/TaskListNumber'
import TaskList from '../taskslist/TaskList'

const EmployeeDashboard = ({ changeUser, data, theme, onToggleTheme }) => (
  <main className="dashboard-page">
    <div className="dashboard-container">
      <Header changeUser={changeUser} data={data} role="employee" theme={theme} onToggleTheme={onToggleTheme} />
      <section className="page-intro">
        <div>
          <p className="eyebrow">YOUR WORKSPACE</p>
          <h2 className="page-title">Your tasks</h2>
          <p className="page-description">Tasks assigned to you are listed below.</p>
        </div>
      </section>
      <TaskListNumber data={data} />
      <section className="task-section">
        <div className="section-heading">
          <div>
            <h2 className="section-title">My assignments</h2>
            <p className="section-description">Move each task forward as you make progress.</p>
          </div>
          <span className="task-total">{data.tasks.length} total</span>
        </div>
        <TaskList data={data} />
      </section>
    </div>
  </main>
)

export default EmployeeDashboard
