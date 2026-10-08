import { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthContext'

const readStoredSession = () => {
  const storedSession = localStorage.getItem('loggedInUser')

  if (!storedSession) {
    return { user: null, error: '' }
  }

  let session
  try {
    session = JSON.parse(storedSession)
  } catch (error) {
    if (error instanceof SyntaxError) {
      return { user: null, error: 'Saved login session is invalid. Please sign in again.' }
    }
    throw error
  }

  const role = session?.role
  const id = session?.id ?? session?.data?.id

  if (!['admin', 'employee'].includes(role) || id === undefined || id === null) {
    return { user: null, error: 'Saved login session is incomplete. Please sign in again.' }
  }

  return { user: { role, id }, error: '' }
}

const App = () => {
  const { admin, employees } = useContext(AuthContext)
  const [savedSession, setSavedSession] = useState(() => readStoredSession())
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  )
  const session = savedSession.user
  const userList = session?.role === 'admin' ? admin : employees
  const sessionAccount = session
    ? userList.find((item) => String(item.id) === String(session.id))
    : null
  const loggedInUserData = sessionAccount && !(session.role === 'employee' && sessionAccount.active === false)
    ? sessionAccount
    : null

  const handleLogin = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase()
    const adminUser = admin.find(
      (item) => normalizedEmail === item.email.toLowerCase() && password === item.password
    )
    const employeeUser = adminUser
      ? null
      : employees.find(
          (item) => item.active !== false && normalizedEmail === item.email.toLowerCase() && password === item.password
        )
    const authenticatedUser = adminUser ?? employeeUser

    if (!authenticatedUser) {
      return false
    }

    const role = adminUser ? 'admin' : 'employee'
    const nextSession = { role, id: authenticatedUser.id }
    localStorage.setItem('loggedInUser', JSON.stringify(nextSession))
    setSavedSession({ user: nextSession, error: '' })
    return true
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    setSavedSession({ user: null, error: '' })
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark')
  }

  const loginError =
    savedSession.error ||
    (session && sessionAccount?.active === false
      ? 'This employee account has been paused. Please contact the administrator.'
      : session && !loggedInUserData
      ? 'The saved account no longer exists. Please sign in again.'
      : '')

  return (
    <div className="app-shell">
      {!loggedInUserData && (
        <Login
          handleLogin={handleLogin}
          errorMessage={loginError}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {loggedInUserData && session.role === 'admin' && (
        <AdminDashboard
          changeUser={handleLogout}
          data={loggedInUserData}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {loggedInUserData && session.role === 'employee' && (
        <EmployeeDashboard
          changeUser={handleLogout}
          data={loggedInUserData}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}
    </div>
  )
}

export default App
