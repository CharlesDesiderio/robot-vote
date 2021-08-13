import { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import UserContext from "../contexts/UserContext"
import logo from '../images/MR-Logo 1.svg'
import hamburger from '../images/hamburger.svg'
import xIcon from '../images/X.svg'

const NavBar = () => {

  const UserContextData = useContext(UserContext);

  const initialUserData = {
    loggedIn: false,
    token: '',
    id: '',
    name: '',
    email: ''
  };

  const [menuStyle, setMenuStyle] = useState('none')

  const showMenu = () => {
    setMenuStyle('block')
  }

  const hideMenu = () => {
    setMenuStyle('none')
  }


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
        UserContextData.setUserData(initialUserData)
      } else {
        throw new Error('Session Delete Failed');
      }
    })
    .catch((error) => {

    });
  }

  return UserContextData.userData.loggedIn ? (
    <UserContext.Consumer>
      {context => (
        <nav>
          <ul className="mobileNav">
            <li><img className="nav-logo" alt="Mondo Robot Logo" src={logo} /></li>
            <li><img className="hamburger" alt="Mondo Robot Logo" src={hamburger} onClick={showMenu} /></li>
          </ul>

          <div style={{ display: menuStyle }} className="mobileNavMenu">
            <div className="xBox"><img className="xIcon" src={xIcon} alt="X" onClick={hideMenu} /></div>
            <ul className="mobileNavLi">
              <li onClick={hideMenu} ><h2><Link to="/user/robots">Robots</Link></h2></li>
              <li onClick={hideMenu} ><h2><Link to="/user/results">Results</Link></h2></li>
              { context.userData.email === 'admin@mondorobot.com' ? <li onClick={hideMenu} ><h2><Link to="/user/admin">Admin</Link></h2></li> : '' }
              
              <li className="log-out" onClick={logOut}><h2>Log Out</h2></li>

            </ul>

          </div>

          <ul className="desktopNav">
            <li><img className="nav-logo" alt="Mondo Robot Logo" src={logo} /></li>
            <li><Link to="/user/robots">Robots</Link></li>
            <li><Link to="/user/results">Results</Link></li>
            { context.userData.email === 'admin@mondorobot.com' ? <li><Link to="/user/admin">Admin</Link></li> : '' }
          </ul>
          <ul className="desktopNav user-interactions">
            <li className="nav-name">{context.userData.name}</li>
            <li className="log-out" onClick={logOut}>Log Out</li>
          </ul>
        </nav>
      )}
    </UserContext.Consumer>
  ) : <Redirect to='/' />
}

export default NavBar