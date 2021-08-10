import UserContext from "../contexts/UserContext"

const NavBar = () => {
  return (
    <UserContext.Consumer>
      {context => (
        <div>
          <ul>
            <li>Logo</li>
            <li>Robots</li>
            <li>Results</li>
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