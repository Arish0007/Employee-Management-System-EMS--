import React from 'react'

const FailedTask = ({data}) => {
  return (
<div className='flex-shrink-0  h-full w-[200px] bg-yellow-400 p-5 rounded-xl'>

             <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 px-3 py-1 rounded text-sm'>{data.category}</h3>
                 <h4 className='text-sm'>{data.taskDate}</h4>
            </div>
                < h2 className='mt-5 text-xl font-semibold' > {data.taskTitle}</h2>
               <p className='text-sm text-gray-600' > {data.taskDescription}</p>
            <div className='mt-2'>
            <button className='w-full'>Failed</button>

            </div>

        </div>  )
}

export default FailedTask