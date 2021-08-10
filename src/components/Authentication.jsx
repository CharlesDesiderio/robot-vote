import { useState } from 'react';

import Login from './Login';
import Register from './Register';

const Authentication = () => {
  const [newUserRegister, setNewUserRegister] = useState(false);
  const [toggleButtonValue, setToggleButtonValue] = useState('Register');

  const toggleNewUserRegister = () => {
    setNewUserRegister(!newUserRegister);
    if (newUserRegister) {
      setToggleButtonValue('Register');
    } else {
      setToggleButtonValue('Back to Login');
    }
  };

  return (
    <div>
      {newUserRegister ? <Register /> : <Login />}
      <button onClick={toggleNewUserRegister}>{toggleButtonValue}</button>
    </div>
  );
};

export default Authentication;
