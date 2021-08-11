import { Link } from 'react-router-dom'
import UserContext from "../contexts/UserContext"

const NavBar = () => {
  return (
    <UserContext.Consumer>
      {context => (
        <div>
          <ul>
            <li>Logo</li>
            <li><Link to="/user/robots">Robots</Link></li>
            <li><Link to="/user/results">Results</Link></li>
            { context.userData.email === 'admin@mondorobot.com' ? <li><Link to="/user/admin">Admin</Link></li> : '' }
          </ul>
          <ul>
            <li>{context.userData.name}</li>
            <li>Log Out</li>
          </ul>
        </div>
      )}
    </UserContext.Consumer>
  )
}

export default NavBar