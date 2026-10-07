import React , { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const CreateTask = () => {


  const [userData, setUserData] =  useContext(AuthContext)
  

const [taskTitle, settaskTitle] = useState('')
const [taskDescription, settaskDescription] = useState('')
const [taskDate, settaskDate] = useState('')
const [assignTo, setassignTo] = useState('')
const [category, setcategory] = useState('')

const [newTask, setNewTask] = useState([])

  const submitHandler = (e) => {
    e.preventDefault()
    setNewTask({taskTitle, taskDescription, taskDate, assignTo, category,active:false, newTask:true, completed:false, failed:false})
  
    const data = userData

    data.forEach((elem) =>{
      if(assignTo == elem.firstName){
        elem.tasks.push(newTask)
        elem.taskNumber.newTask = elem.taskNumber.newTask + 1
        
      }
    })
      setUserData(data)
        console.log(data);


    settaskTitle('')
    settaskDescription('')
    settaskDate('')
    setassignTo('') 
    setcategory('')
  }

  return (
    <div className="p-5 mt-7 rounded">
      
      <form 
      onSubmit={(e) => {
        submitHandler(e)
      }}
      className="flex flex-wrap w-full items-start justify-between">

        <div className="w-1/2">
            <div>
            <h3 className="text-sm text-gray-300 mb-1">
              Task title
            </h3>

            <input
            value={taskTitle}
            onChange={(e) => {
              settaskTitle(e.target.value)
            }}
              className="text-sm py-2 px-2 w-4/5 rounded outline-none bg-transparent border border-gray-400 mb-4"
              placeholder="Task title"
            />
          </div>

          <div>
            <h3 className="text-sm text-gray-300 mb-1">
              Date
            </h3>

            <input
            value={taskDate}
            onChange={(e) => {
              settaskDate(e.target.value)
            }}
              className="text-sm py-2 px-2 w-4/5 rounded outline-none bg-transparent border border-gray-400 mb-4"
              type="date"
            />
          </div>

          <div>
            <h3 className="text-sm text-gray-300 mb-1">
              Assign to
            </h3>

            <input
              value={assignTo}
              onChange={(e) => {
                setassignTo(e.target.value)
              }}
              className="text-sm py-2 px-2 w-4/5 rounded outline-none bg-transparent border border-gray-400 mb-4"
              placeholder="Employee name"
            />
          </div>

          <div>
            <h3 className="text-sm text-gray-300 mb-1">
              Category
            </h3>

            <input
              value={category}
              onChange={(e) => {
                setcategory(e.target.value)
              }}
              className="text-sm py-2 px-2 w-4/5 rounded outline-none bg-transparent border border-gray-400"
              placeholder="design, dev, etc."
            />
          </div>

        </div>

        <div className="w-1/2">

          <h3 className="text-sm text-gray-300 mb-1">
            Description
          </h3>

          <textarea
            value={taskDescription}
            onChange={(e) => {
              settaskDescription(e.target.value)
            }}
            className="text-sm py-2 px-2 w-full h-45 rounded outline-none bg-transparent border border-gray-400"
            placeholder="Task description"
          />

          <button
            className="bg-emerald-500 py-3 px-5 rounded text-sm mt-4 w-full hover:bg-emerald-700"
          >
            Create Task
          </button>

        </div>

      </form>

    </div>
  )
}


export default CreateTask