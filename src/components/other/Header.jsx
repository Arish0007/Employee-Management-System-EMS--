const ThemeIcon = ({ theme }) => theme === 'dark' ? (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
  </svg>
) : (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.6 8.6 0 1 0 20.2 15.2Z" />
  </svg>
)

const Header = ({ changeUser, data, role, theme, onToggleTheme }) => {
  return (
    <header className="dashboard-header">
      <div className="wordmark" aria-label="Employee management">
        <span>Employee management</span>
      </div>

      <div className="header-account">
        <div className="profile-avatar">
          <span aria-hidden="true">{data?.firstName?.charAt(0)?.toUpperCase() || '?'}</span>
        </div>
        <div className="account-copy">
          <span className="account-name">{data?.firstName || 'Admin'}</span>
          <span className="account-role">{role === 'admin' ? 'Administrator' : 'Employee'}</span>
        </div>
      </div>

      <div className="header-actions">
        <button
          type="button"
          onClick={onToggleTheme}
          className="theme-toggle"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          aria-pressed={theme === 'dark'}
        >
          <ThemeIcon theme={theme} />
        </button>
        <button type="button" onClick={changeUser} className="logout-button">
          Log out
        </button>
      </div>
    </header>
  )
}

export default Header
