import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

import logo from '../images/MR-Logo 1.svg'

const Login = () => {
  
  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const UserContextData = useContext(UserContext);

  const handleChange = (event) => setInput({...input,
    [event.currentTarget.name]: event.currentTarget.value
  })

  useEffect(() => {
    UserContextData.setErrorMessage('')
  }, [])

  return (
      <UserContext.Consumer>
        {context => (
          <div className="login">
            <img className="logo-image" alt="Mondo Robot Logo" src={logo} />
            <div className="input-box">
              <label htmlFor="email">Email</label>
              <input name="email" value={input['email']} onChange={handleChange} type="email" />
            </div>
            <div className="input-box">
              <label htmlFor="password">Password</label>
              <input name="password" value={input['password']} onChange={handleChange} type="password" />
            </div>
            { context.errorMessage ? <span>{context.errorMessage}</span> : '' }
            <button className="login-button" onClick={() => context.attemptLogin(input['email'], input['password'])}>Log In</button>
            
              <Link className="link" to="/register"><button className="back" >Register</button></Link>
            
          </div>
        )}

      </UserContext.Consumer>
  )
}

export default Login;