import UserContext from "../contexts/UserContext"
import NavBar from './NavBar'
import Robots from "./Robots"

const Main = () => {
  return (
    <UserContext.Consumer>
      {context => (
        <div>
          <NavBar />
          <Robots />
        </div>
      )}
      </UserContext.Consumer>
  )
}

export default Main