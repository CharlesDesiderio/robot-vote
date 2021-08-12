import { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import UserContext from "../contexts/UserContext"
import logo from '../images/MR-Logo 1.svg'

const NavBar = () => {

  const UserContextData = useContext(UserContext);

  const initialUserData = {
    loggedIn: false,
    token: '',
    id: '',
    name: '',
    email: ''
  };

  const [loggedOut, setLoggedOut] = useState(false)

  const logOut = () => {
    fetch('https://mondo-robot-art-api.herokuapp.com/auth/session', {
      method: 'DELETE',
      headers: {
        'x-robot-art-api-key': '346ee7ddde4bb72637e20fe9eff91306',
        Authorization: `Bearer ${UserContextData.userData.token}`,
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      if (response.ok) {
        console.log('Session deleted')
        setLoggedOut(true)
        UserContextData.setUserData(initialUserData)
      } else {
        throw new Error('Session Delete Failed');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return UserContextData.userData.loggedIn ? (
    <UserContext.Consumer>
      {context => (
        <nav>

          <ul>
            <li><img className="nav-logo" alt="Mondo Robot Logo" src={logo} /></li>
            <li><Link to="/user/robots">Robots</Link></li>
            <li><Link to="/user/results">Results</Link></li>
            { context.userData.email === 'admin@mondorobot.com' ? <li><Link to="/user/admin">Admin</Link></li> : '' }
          </ul>
          <ul className="user-interactions">
            <li>{context.userData.name}</li>
            <li className="log-out" onClick={logOut}>Log Out</li>
          </ul>
        </nav>
      )}
    </UserContext.Consumer>
  ) : <Redirect to='/' />
}

export default NavBar