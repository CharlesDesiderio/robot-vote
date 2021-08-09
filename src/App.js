import { useState } from 'react'

import Login from "./components/Login"
import Register from './components/Register'

const App = () => {

  const [newUserRegister, setNewUserRegister] = useState(false)
  const [toggleButtonValue, setToggleButtonValue] = useState('Register')

  const toggleNewUserRegister = () => {
    setNewUserRegister(!newUserRegister)
    if (newUserRegister) {
      setToggleButtonValue('Register')
    } else {
      setToggleButtonValue('Back to Login')
    }
  }

  return (
    <div>
      {newUserRegister ? <Register /> : <Login />}
      <button onClick={toggleNewUserRegister}>{ toggleButtonValue }</button>
      
    </div>
  )
}

export default App;