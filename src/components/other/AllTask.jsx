import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {

      const [userData, setUserData] =  useContext(AuthContext)


      
  return (
    <div id="taskList" className="p-5 bg-[#1c1c1c] mt-5 rounded ">

      <div className="bg-red-400 mb-2 flex justify-between rounded px-4 py-2">
            <h2 className='w-1/5 ' >Employee Name</h2>
            <h3 className='w-1/5 '>New Task</h3>
            <h5 className='w-1/5 '>Active Task</h5>
             <h5 className='w-1/5 '>Completed</h5>
             <h5 className='w-1/5 '>Failed</h5>
        </div>  

            <div className=''>
                {userData.map((elem, idx)=>{
            return (
  <div className=" key={idx} border-2 border-emerald-400 mb-2 flex justify-between rounded px-4 py-2">
            <h2 className='text-lg font-medium w-1/5 ' >{elem.firstName}</h2>
            <h3 className='text-lg font-medium w-1/5 text-blue-600'>{elem.taskNumber.newTask}</h3>
            <h5 className='text-lg font-medium w-1/5 text-yellow-400'>{elem.taskNumber.active}</h5>
             <h5 className='text-lg font-medium w-1/5 text-white'>{elem.taskNumber.completed}</h5>
             <h5 className='text-lg font-medium w-1/5 text-red-600'>{elem.taskNumber.failed}</h5>
        </div>
        )})}
    
            </div>
    
    </div>  
   
  )
}

export default AllTask