import React from 'react'
import { useState } from 'react'

const Header = (props) => {

const logOutUser = () => {
localStorage.setItem('loggedInUser','')
props.changeUser('')
// window.location.reload()
}

  return (
    <div className='flex justify-between items-end  text-white  
    '>
        <h1 className='text-2xl font-medium'> Hello <br/> <span className='text-3xl font-semibold'>{props.data?.firstName || 'Admin'}</span></h1>
        <button
        onClick={logOutUser}
        className='bg-red-500 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-red-600'
        >Log out</button>
    </div>
  )
}

export default Header
