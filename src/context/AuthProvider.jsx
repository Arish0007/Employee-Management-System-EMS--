import { useState } from 'react'
import { AuthContext } from './AuthContext'
import { getLocalStorage } from '../utils/LocalStorage'

const getTaskCounts = (tasks) =>
  tasks.reduce((counts, task) => {
    if (task.active) counts.active += 1
    else if (task.newTask) counts.newTask += 1
    else if (task.completed) counts.completed += 1
    else if (task.failed) counts.failed += 1
    return counts
  }, { active: 0, newTask: 0, completed: 0, failed: 0 })

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => getLocalStorage())

  const saveEmployees = (employees) => {
    localStorage.setItem('employees', JSON.stringify(employees))
    setUserData((current) => ({ ...current, employees }))
  }

  const addEmployee = ({ firstName, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const alreadyExists = [...userData.employees, ...userData.admin]
      .some((user) => user.email.toLowerCase() === normalizedEmail)

    if (alreadyExists) {
      return { success: false, error: 'An account with this email already exists.' }
    }

    const nextEmployee = {
      id: userData.employees.reduce((largestId, user) => Math.max(largestId, Number(user.id) || 0), 0) + 1,
      firstName: firstName.trim(),
      email: normalizedEmail,
      password,
      active: true,
      tasks: [],
      taskNumber: getTaskCounts([])
    }

    try {
      saveEmployees([...userData.employees, nextEmployee])
      return { success: true, employee: nextEmployee }
    } catch (error) {
      console.error('Unable to save the employee:', error)
      return { success: false, error: 'Could not save the employee. Check browser storage and try again.' }
    }
  }

  const addTask = (employeeId, task) => {
    const employee = userData.employees.find((user) => String(user.id) === String(employeeId))
    if (!employee || employee.active === false) return false

    const nextTask = {
      ...task,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      comments: []
    }
    const employees = userData.employees.map((user) => {
      if (String(user.id) !== String(employeeId)) return user
      const tasks = [...user.tasks, nextTask]
      return { ...user, tasks, taskNumber: getTaskCounts(tasks) }
    })

    saveEmployees(employees)
    return true
  }

  const updateTask = (employeeId, taskId, updates) => {
    const employee = userData.employees.find((user) => String(user.id) === String(employeeId))
    if (!employee?.tasks.some((task) => String(task.id) === String(taskId))) return false

    const employees = userData.employees.map((user) => {
      if (String(user.id) !== String(employeeId)) return user
      const tasks = user.tasks.map((task) =>
        String(task.id) === String(taskId) ? { ...task, ...updates } : task
      )
      return { ...user, tasks, taskNumber: getTaskCounts(tasks) }
    })

    saveEmployees(employees)
    return true
  }

  const updateTaskStatus = (employeeId, taskId, status, note = '') => {
    const task = userData.employees
      .find((user) => String(user.id) === String(employeeId))
      ?.tasks.find((item) => String(item.id) === String(taskId))
    if (!task) return false

    const updates = {
      active: status === 'active',
      newTask: status === 'newTask',
      completed: status === 'completed',
      failed: status === 'failed',
      rejected: status === 'failed' && Boolean(note.trim()),
      rejectionNote: status === 'failed' ? note.trim() : ''
    }
    if (status === 'completed') updates.completionNote = note.trim()
    return updateTask(employeeId, taskId, updates)
  }

  const editTask = (employeeId, taskId, newEmployeeId, details) => {
    const sourceEmployee = userData.employees.find((user) => String(user.id) === String(employeeId))
    const targetEmployee = userData.employees.find((user) => String(user.id) === String(newEmployeeId))
    const task = sourceEmployee?.tasks.find((item) => String(item.id) === String(taskId))
    if (!task || !targetEmployee || targetEmployee.active === false) return false

    const updatedTask = { ...task, ...details }
    const employees = userData.employees.map((user) => {
      if (String(user.id) === String(employeeId) && String(employeeId) !== String(newEmployeeId)) {
        const tasks = user.tasks.filter((item) => String(item.id) !== String(taskId))
        return { ...user, tasks, taskNumber: getTaskCounts(tasks) }
      }
      if (String(user.id) === String(newEmployeeId)) {
        const tasks = String(employeeId) === String(newEmployeeId)
          ? user.tasks.map((item) => String(item.id) === String(taskId) ? updatedTask : item)
          : [...user.tasks, updatedTask]
        return { ...user, tasks, taskNumber: getTaskCounts(tasks) }
      }
      return user
    })

    saveEmployees(employees)
    return true
  }

  const deleteTask = (employeeId, taskId) => {
    const employee = userData.employees.find((user) => String(user.id) === String(employeeId))
    if (!employee?.tasks.some((task) => String(task.id) === String(taskId))) return false
    const employees = userData.employees.map((user) => {
      if (String(user.id) !== String(employeeId)) return user
      const tasks = user.tasks.filter((task) => String(task.id) !== String(taskId))
      return { ...user, tasks, taskNumber: getTaskCounts(tasks) }
    })
    saveEmployees(employees)
    return true
  }

  const addTaskComment = (employeeId, taskId, text, author) => {
    const employee = userData.employees.find((user) => String(user.id) === String(employeeId))
    const task = employee?.tasks.find((item) => String(item.id) === String(taskId))
    if (!task || !text.trim()) return false

    const comment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text: text.trim(),
      author: author.name,
      createdAt: new Date().toISOString()
    }
    return updateTask(employeeId, taskId, {
      comments: [...(task.comments || []), comment]
    })
  }

  const updateEmployee = (employeeId, details) => {
    const email = details.email.trim().toLowerCase()
    const emailExists = [...userData.employees, ...userData.admin].some(
      (user) => String(user.id) !== String(employeeId) && user.email.toLowerCase() === email
    )
    if (emailExists) return { success: false, error: 'An account with this email already exists.' }

    const employees = userData.employees.map((user) =>
      String(user.id) === String(employeeId)
        ? { ...user, firstName: details.firstName.trim(), email }
        : user
    )
    saveEmployees(employees)
    return { success: true }
  }

  const toggleEmployeeActive = (employeeId) => {
    const employees = userData.employees.map((user) =>
      String(user.id) === String(employeeId)
        ? { ...user, active: user.active === false }
        : user
    )
    saveEmployees(employees)
  }

  const removeEmployee = (employeeId) => {
    const employees = userData.employees.filter((user) => String(user.id) !== String(employeeId))
    saveEmployees(employees)
    localStorage.removeItem(`profilePhoto:employee:${employeeId}`)
  }

  return (
    <AuthContext.Provider value={{
      employees: userData.employees,
      admin: userData.admin,
      addEmployee,
      addTask,
      updateTaskStatus,
      editTask,
      deleteTask,
      addTaskComment,
      updateEmployee,
      toggleEmployeeActive,
      removeEmployee
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
