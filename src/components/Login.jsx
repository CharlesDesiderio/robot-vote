import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

import logo from '../images/MR-Logo 1.svg'

const Login = (props) => {
  
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
            <form onSubmit={(event) => {
              event.preventDefault()
              context.attemptLogin(input['email'], input['password'])
              }}>
              <div className="input-box">
                <label htmlFor="email">Email</label>
                <input id="name" name="email" value={input['email']} onChange={handleChange} type="email" />
              </div>
              <div className="input-box">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" value={input['password']} onChange={handleChange} type="password" />
              </div>
              { context.errorMessage ? <span className="errorMessage">{context.errorMessage}</span> : '' }
              <button disabled={props.isAuthing} className="login-button" type="submit">Log In</button>
              
            </form>
              <Link className="link" to="/register"><button className="back" >Register</button></Link>
            
          </div>
        )}

      </UserContext.Consumer>
  )
}

export default Login;