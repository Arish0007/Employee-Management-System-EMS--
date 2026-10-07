import React from 'react'
import AcceptTask from '../taskslist/AcceptTask'
import NewTask from '../taskslist/NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'
const TaskList = ({data}) => {
    console.log(data);
  return (
    <div id='taskList' 
    className='flex items-center justify-start gap-5 flex-nowrap h-[55%]  w-full overflow-x-auto py-5 mt-10' >
      {data.tasks.map((elem,idx)=>{
        if(elem.active){
            return <AcceptTask key={idx} data={elem} />
        }
        if(elem.NewTask){
            return <NewTask key={idx} data={elem} />
        }
        if(elem.completed){
            return <CompleteTask key={idx} data={elem} />
        }
        if(elem.failed){
            return <FailedTask key={idx} data={elem} />
        }
      })}
    </div>
  )
}

export default TaskList