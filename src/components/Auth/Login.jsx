import React, {useState} from 'react'

const Login = ({handleLogin}) => {

const [Email, setEmail] = useState('');
const [Password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
   handleLogin(Email, Password)
    setEmail('');
    setPassword('');
  
  }

  return (
    <div className='flex  h-screen w-screen *:flex justify-center items-center'>
      <div className='border-2 border-green-500'>

        <form
        onSubmit={(e) =>
            handleSubmit(e)} 
        className='flex flex-col items-center justify-center gap-4 p-4'>
          <input
          value={Email} 
          onChange={(e) => 
          setEmail(e.target.value)
          }
           required
           className='text-black outline-none bg-transparent placeholder:text-gray-500 border-2 border-green-500 p-2 rounded'
           type="email" placeholder='Enter your email'  />
          <input
          value={Password}
          onChange={(e) => 
            setPassword(e.target.value)}
          required
           className='text-black outline-none bg-transparent placeholder:text-gray-500 border-2 border-green-500 p-2 rounded'
           type="password" placeholder='Enter your password' />
          <button type='submit' className='bg-green-500  text-white px-4 py-2 rounded-2xl'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login