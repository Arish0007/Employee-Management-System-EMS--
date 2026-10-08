const UPDATED_KEY = 'updated'
const EMPLOYEES_KEY = 'employees'
let pendingWrite = Promise.resolve()

export const loadEmployeesFromFile = async () => {
  const response = await fetch('/api/employees')
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.error || 'Unable to load employee data file.')
  }
  if (result.employees !== null && !Array.isArray(result.employees)) {
    throw new Error('The employee data file must contain an employees array.')
  }
  return result.employees
}

export const readUpdatedEmployees = (fallback) => {
  const storedValue = localStorage.getItem(UPDATED_KEY) ?? localStorage.getItem(EMPLOYEES_KEY)
  if (storedValue === null) return fallback

  let employees
  try {
    employees = JSON.parse(storedValue)
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Saved employee data is not valid JSON. Clear the updated or employees Local Storage entry and reload.', { cause: error })
    }
    throw error
  }

  if (!Array.isArray(employees)) {
    throw new Error('Saved employee data must be an array. Clear the updated or employees Local Storage entry and reload.')
  }

  return employees
}

export const saveUpdatedEmployeesLocally = (employees) => {
  const value = JSON.stringify(employees)
  localStorage.setItem(UPDATED_KEY, value)
  localStorage.setItem(EMPLOYEES_KEY, value)
}

export const saveUpdatedEmployees = (employees) => {
  saveUpdatedEmployeesLocally(employees)

  const write = pendingWrite.catch(() => {}).then(async () => {
    const response = await fetch('/api/employees', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employees })
    })
    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.error || 'Unable to save employee data file.')
    }
  })

  pendingWrite = write
  return write
}
