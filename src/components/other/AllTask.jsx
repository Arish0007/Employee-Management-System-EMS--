import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const columns = [
  { key: 'newTask', label: 'New' },
  { key: 'active', label: 'In progress' },
  { key: 'completed', label: 'Completed' },
  { key: 'failed', label: 'Needs attention' }
]

const AllTask = () => {
  const { employees } = useContext(AuthContext)
  const teamTaskCount = employees.reduce((total, employee) => total + employee.tasks.length, 0)

  return (
    <section className="panel team-panel">
      <div className="section-heading">
        <div>
          <h2 className="section-title">Team workload</h2>
          <p className="section-description">Task status across all employees.</p>
        </div>
        <span className="task-total">{teamTaskCount} tasks</span>
      </div>

      <div className="table-scroll">
        <table className="team-table">
          <thead>
            <tr>
              <th scope="col">Employee</th>
              {columns.map((column) => (
                <th key={column.key} scope="col">{column.label}</th>
              ))}
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <th scope="row">
                  <span className="employee-cell">
                    <span className="avatar">{employee.firstName?.charAt(0) || '?'}</span>
                    <span>{employee.firstName}</span>
                  </span>
                </th>
                {columns.map((column) => (
                  <td key={column.key}>{employee.taskNumber[column.key]}</td>
                ))}
                <td className="total-cell">{employee.tasks.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AllTask
