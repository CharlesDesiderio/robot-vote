import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import logo from '../images/MR-Logo 1.svg'

const Register = () => {
  
  const [input, setInput] = useState({
    fullName: '',
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
        <div className='register'>
          <img className="logo-image" alt="Mondo Robot Logo" src={logo} />
          <form onSubmit={(event) => {
            event.preventDefault()
            context.attemptRegister(input['fullName'], input['email'], input['password'])
          }}>
          <div className="input-box">

          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" value={input['fullName']} onChange={handleChange} type="text" />
          </div>
          <div className="input-box">

          <label htmlFor="email">Email</label>
          <input id="email" name="email" value={input['email']} onChange={handleChange} type="email" />
          </div>
          <div className="input-box">

          <label htmlFor="password">Password</label>
          <input id="password" name="password" value={input['password']} onChange={handleChange} type="password" />
          </div>

          { context.errorMessage ? <span className="errorMessage">{context.errorMessage}</span> : '' }
          <button className="register-button" type="submit">Register</button>
          </form>
            <Link to="/"><button className="back" >Back to Login</button></Link>
        </div>
      )}
    </UserContext.Consumer>
  )
}

export default Register;