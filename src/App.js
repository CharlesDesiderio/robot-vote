import { useState } from 'react';

import UserContext from './contexts/UserContext';
import Authentication from './components/Authentication';
import Main from './components/Main';

const App = () => {
  const initialUserData = {
    loggedIn: false,
    id: '',
    name: '',
    email: '',
  };

  const [userData, setUserData] = useState(initialUserData);
  const [errorMessage, setErrorMessage] = useState('');

  const updateUserData = (data) => {
    let newUserData = {
      loggedIn: true,
      id: data.id,
      name: data.name,
      email: data.email,
    };
    setUserData(newUserData);
  };

  const attemptLogin = (email, password) => {
    setErrorMessage('')
    let loginData = {
      email: email,
      password: password,
    };

    fetch('https://mondo-robot-art-api.herokuapp.com/auth/session', {
      method: 'POST',
      headers: {
        'x-robot-art-api-key': '346ee7ddde4bb72637e20fe9eff91306',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            'Failed to login. Please check credentials and try again.'
          );
        }
      })
      .then((token) => {
        fetch('https://mondo-robot-art-api.herokuapp.com/auth/session', {
          method: 'GET',
          headers: {
            'x-robot-art-api-key': '346ee7ddde4bb72637e20fe9eff91306',
            Authorization: `Bearer ${token.token}`,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            let newUserData = {
              loggedIn: true,
              id: data.id,
              name: data.name,
              email: data.email,
            };
            setUserData(newUserData);
          });
      })
      .catch((error) => {
        setErrorMessage(
          'Failed to login. Please check credentials and try again.'
        );
      });
  };

  const attemptRegister = (fullName, email, password) => {
    setErrorMessage('')
    let newUser = {
      name: fullName,
      email: email,
      password: password,
    };

    fetch('https://mondo-robot-art-api.herokuapp.com/auth/register', {
      method: 'POST',
      headers: {
        'x-robot-art-api-key': '346ee7ddde4bb72637e20fe9eff91306',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Invalid User.');
        }
      })
      .then((data) => {
        let newUserData = {
          loggedIn: true,
          id: data.id,
          name: data.name,
          email: data.email,
        };
        setUserData(newUserData);
      })
      .catch((error) => {
        setErrorMessage('Invalid User.');
      });
  };

  return (
    <div>
      <UserContext.Provider
        value={{ userData, updateUserData, attemptLogin, attemptRegister, errorMessage, setErrorMessage }}
      >
        {userData.loggedIn ? <Main /> : <Authentication />}
      </UserContext.Provider>
    </div>
  );
};

export default App;
