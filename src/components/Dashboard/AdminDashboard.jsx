import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import CreateEmployee from '../other/CreateEmployee'
import AllTask from '../other/AllTask'
import TaskCenter from '../other/TaskCenter'
import EmployeeManagement from '../other/EmployeeManagement'

const AdminDashboard = ({ changeUser, data, theme, onToggleTheme }) => {
  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <Header changeUser={changeUser} data={data} role="admin" theme={theme} onToggleTheme={onToggleTheme} />
        <section className="page-intro">
          <p className="eyebrow">ADMINISTRATOR</p>
          <h2 className="page-title">Team overview</h2>
          <p className="page-description">Create employees, assign work, and follow task progress.</p>
        </section>
        <CreateTask />
        <CreateEmployee />
        <AllTask />
        <TaskCenter />
        <EmployeeManagement />
      </div>
    </main>
  )
}

export default AdminDashboard
