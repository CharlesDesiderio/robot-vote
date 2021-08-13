import { useState } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import env from "react-dotenv";

import './style/global.css'

import UserContext from './contexts/UserContext';
import Authentication from './components/Authentication';
import NavBar from './components/NavBar'
import Robots from './components/Robots'
import RobotResults from './components/RobotResults';
import AdminView from './components/AdminView';

const App = () => {
  
  const initialUserData = {
    loggedIn: false,
    token: '',
    id: '',
    name: '',
    email: ''
  };

  const [userData, setUserData] = useState(initialUserData);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthing, setIsAuthing] = useState(false)

  const updateUserData = (data) => {
    let newUserData = {
      loggedIn: true,
      token: '',
      id: data.id,
      name: data.name,
      email: data.email,
    };
    setUserData(newUserData);
  };

  const attemptLogin = (email, password) => {
    setIsAuthing(true)
    setErrorMessage('')
    let loginData = {
      email: email,
      password: password,
    };

    fetch('https://mondo-robot-art-api.herokuapp.com/auth/session', {
      method: 'POST',
      headers: {
        'x-robot-art-api-key': env.API_KEY,
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
            'x-robot-art-api-key': env.API_KEY,
            Authorization: `Bearer ${token.token}`,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            let newUserData = {
              loggedIn: true,
              token: token.token,
              id: data.id,
              name: data.name,
              email: data.email,
            };
            setUserData(newUserData);
            setIsAuthing(false)
          });
      })
      .catch((error) => {
        setErrorMessage(
          'Failed to login. Please check credentials and try again.'
        );
        setIsAuthing(false)
      });
  };

  const attemptRegister = (fullName, email, password) => {
    setErrorMessage('')
    setIsAuthing(true)
    let newUser = {
      name: fullName,
      email: email,
      password: password,
    };

    fetch('https://mondo-robot-art-api.herokuapp.com/auth/register', {
      method: 'POST',
      headers: {
        'x-robot-art-api-key': env.API_KEY,
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
        attemptLogin(email, password)
        setIsAuthing(false)
      })
      .catch((error) => {
        setErrorMessage('Invalid User.');
        setIsAuthing(false)
      });
  };

  return (
    <div className='main'>
      <UserContext.Provider value={{ userData, setUserData, updateUserData, attemptLogin, attemptRegister, errorMessage, setErrorMessage }} >
        <BrowserRouter>
          <Route exact path="/">
            {userData.loggedIn ? <Redirect to="/app/robots" /> : <Authentication isAuthing={isAuthing} />}
          </Route>
            <Route path="/app/" component={NavBar} />
            <Route path="/app/robots" component={Robots} />
            <Route path="/app/results" component={RobotResults} />
            <Route path="/app/admin" component={AdminView} />
            <Redirect from="*" to="/" />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};

export default App;
