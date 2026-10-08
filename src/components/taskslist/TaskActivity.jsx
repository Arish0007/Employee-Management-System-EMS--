import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

const TaskActivity = ({ task, employeeId, role, employeeName, onComplete, onReject }) => {
  const { addTaskComment } = useContext(AuthContext)
  const [commentText, setCommentText] = useState('')
  const [note, setNote] = useState('')
  const [showRejectForm, setShowRejectForm] = useState(false)
  const [message, setMessage] = useState('')

  const submitComment = (event) => {
    event.preventDefault()
    const name = role === 'admin' ? 'Administrator' : employeeName
    if (addTaskComment(employeeId, task.id, commentText, { role, name })) {
      setCommentText('')
      setMessage('Comment added.')
    }
  }

  const comments = task.comments || []

  return (
    <div className="task-activity">
      {task.completionNote && (
        <p className="completion-note"><strong>Completion note:</strong> {task.completionNote}</p>
      )}
      {task.rejectionNote && (
        <p className="rejection-note">
          <strong>{role === 'admin' ? 'Employee rejection reason:' : 'Rejection note:'}</strong> {task.rejectionNote}
        </p>
      )}

      {comments.length > 0 && (
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id}>
              <span>{comment.text}</span>
              <small>{comment.author} · {new Date(comment.createdAt).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={submitComment} className="comment-form">
        <label className="visually-hidden" htmlFor={`comment-${task.id}`}>Add a comment</label>
        <input
          id={`comment-${task.id}`}
          className="form-input"
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
          placeholder="Write a comment or progress update"
          maxLength={500}
          required
        />
        <button type="submit" className="task-action-button action-subtle">Comment</button>
      </form>
      {message && <p className="form-feedback" role="status">{message}</p>}

      {onComplete && (
        <form
          className="completion-form"
          onSubmit={(event) => {
            event.preventDefault()
            onComplete(note.trim())
          }}
        >
          <label className="visually-hidden" htmlFor={`complete-note-${task.id}`}>Completion note (optional)</label>
          <input
            id={`complete-note-${task.id}`}
            className="form-input completion-input"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            maxLength={500}
            placeholder="Completion note (optional)"
          />
          <button type="submit" className="task-action-button action-primary">Mark done</button>
        </form>
      )}

      {onReject && (
        <div className="reject-task">
          {!showRejectForm ? (
            <button
              type="button"
              className="task-action-button action-danger"
              onClick={() => setShowRejectForm(true)}
            >
              Reject task
            </button>
          ) : (
            <form
              className="reject-form"
              onSubmit={(event) => {
                event.preventDefault()
                if (!note.trim()) return
                onReject(note.trim())
              }}
            >
              <label className="field-label" htmlFor={`reject-note-${task.id}`}>Why can’t you take this task?</label>
              <textarea
                id={`reject-note-${task.id}`}
                className="form-input rejection-input"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                maxLength={500}
                placeholder="Add a short reason"
                required
              />
              <div className="employee-row-actions">
                <button type="submit" className="task-action-button action-danger">Submit rejection</button>
                <button
                  type="button"
                  className="task-action-button action-subtle"
                  onClick={() => { setShowRejectForm(false); setNote('') }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

export default TaskActivity
