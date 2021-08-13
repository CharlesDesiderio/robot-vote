import { useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import logo from '../images/MR-Logo 1.svg'

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
        <div className='register'>
          <img className="logo-image" alt="Mondo Robot Logo" src={logo} />
          <div className="input-box">

          <label htmlFor="fullName">Full Name</label>
          <input name="fullName" value={input['fullName']} onChange={handleChange} type="text" />
          </div>
          <div className="input-box">

          <label htmlFor="email">Email</label>
          <input name="email" value={input['email']} onChange={handleChange} type="email" />
          </div>
          <div className="input-box">

          <label htmlFor="password">Password</label>
          <input name="password" value={input['password']} onChange={handleChange} type="password" />
          </div>

          { context.errorMessage ? <span>{context.errorMessage}</span> : '' }
          <button className="register-button" onClick={() => context.attemptRegister(input['fullName'], input['email'], input['password'])}>Register</button>
            <Link to="/"><button className="back" >Back to Login</button></Link>
        </div>
      )}
    </UserContext.Consumer>
  )
}

export default Register;