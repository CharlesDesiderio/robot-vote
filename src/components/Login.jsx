import { useState } from 'react'
import UserContext from '../contexts/UserContext'

const Login = () => {
  
  const [input, setInput] = useState({
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
            <input name="email" value={input['email']} onChange={handleChange} type="email" />
            <input name="password" value={input['password']} onChange={handleChange} type="password" />
            { context.errorMessage ? <span>{context.errorMessage}</span> : '' }
            <button onClick={() => context.attemptLogin(input['email'], input['password'])}>Log In</button>
          </div>
        )}

      </UserContext.Consumer>
  )
}

export default Login;