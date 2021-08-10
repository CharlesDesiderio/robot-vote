import { useState } from 'react'
import UserContext from '../contexts/UserContext'


const Register = () => {
  
  const [input, setInput] = useState({
    fullName: '',
    email: '',
    password: ''
  })

  const handleChange = (event) => setInput({...input,
    [event.currentTarget.name]: event.currentTarget.value
  })

  return (
    <UserContext.Consumer>
      {context => (
        <div>
          <input name="fullName" value={input['fullName']} onChange={handleChange} type="text" />
          <input name="email" value={input['email']} onChange={handleChange} type="email" />
          <input name="password" value={input['password']} onChange={handleChange} type="password" />
          { context.errorMessage ? <span>{context.errorMessage}</span> : '' }
          <button onClick={() => context.attemptRegister(input['fullName'], input['email'], input['password'])}>Register</button>
        </div>
      )}
    </UserContext.Consumer>
  )
}

export default Register;