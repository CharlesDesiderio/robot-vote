import { BrowserRouter, Route } from 'react-router-dom'

import UserContext from "../contexts/UserContext"
import NavBar from './NavBar'
import RobotResults from './RobotResults'
import Robots from "./Robots"

const Main = () => {
  return (
    <UserContext.Consumer>
      {context => (
        <BrowserRouter>
            <Route path="/robots" component={Robots} />
            <Route path="/" component={NavBar} />
            
        </BrowserRouter>
      )}
      </UserContext.Consumer>
  )
}

export default Main