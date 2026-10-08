import { useRef, useState } from 'react'

const MAX_PHOTO_SIZE = 1024 * 1024

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
  const photoKey = `profilePhoto:${role}:${data?.id}`
  const photoInput = useRef(null)
  const [photo, setPhoto] = useState(() => localStorage.getItem(photoKey) || '')
  const [photoError, setPhotoError] = useState('')

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) {
      return
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setPhotoError('Choose a JPG, PNG, or WebP image.')
      return
    }

    if (file.size > MAX_PHOTO_SIZE) {
      setPhotoError('Choose an image smaller than 1 MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        setPhotoError('That image could not be read. Please try another one.')
        return
      }

      try {
        localStorage.setItem(photoKey, reader.result)
        setPhoto(reader.result)
        setPhotoError('')
      } catch (error) {
        setPhotoError('The photo could not be saved in this browser. Try a smaller image.')
        console.error('Unable to save profile photo:', error)
      }
    }
    reader.onerror = () => setPhotoError('That image could not be read. Please try another one.')
    reader.readAsDataURL(file)
  }

  const removePhoto = () => {
    try {
      localStorage.removeItem(photoKey)
      setPhoto('')
      setPhotoError('')
    } catch (error) {
      setPhotoError('The photo could not be removed. Please try again.')
      console.error('Unable to remove profile photo:', error)
    }
  }

  return (
    <header className="dashboard-header">
      <div className="wordmark" aria-label="Employee management">
        <span>Employee management</span>
      </div>

      <div className="header-account">
        <input
          ref={photoInput}
          className="visually-hidden"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          aria-label="Choose a profile picture"
          onChange={handlePhotoChange}
        />
        <div className="profile-avatar">
          {photo ? (
            <img src={photo} alt={`${data?.firstName || 'User'} profile`} />
          ) : (
            <span aria-hidden="true">{data?.firstName?.charAt(0)?.toUpperCase() || '?'}</span>
          )}
        </div>
        <div className="account-copy">
          <span className="account-name">{data?.firstName || 'Admin'}</span>
          <span className="account-role">{role === 'admin' ? 'Administrator' : 'Employee'}</span>
        </div>
        <button
          type="button"
          className="text-button photo-button"
          onClick={() => photoInput.current?.click()}
        >
          {photo ? 'Change photo' : 'Add photo'}
        </button>
        {photo && (
          <button
            type="button"
            className="text-button remove-photo-button"
            onClick={removePhoto}
            aria-label="Remove profile photo"
          >
            Remove
          </button>
        )}
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
      {photoError && <p className="photo-error" role="alert">{photoError}</p>}
    </header>
  )
}

export default Header
