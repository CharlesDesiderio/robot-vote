import { BrowserRouter, Route } from 'react-router-dom'

import UserContext from "../contexts/UserContext"
import NavBar from './NavBar'
import Robots from "./Robots"

const Main = () => {
  return (
    <UserContext.Consumer>
      {context => (
        <BrowserRouter>
            <Route path="/robots" component={Robots} />
            <Route path="/" component={NavBar} />
            {/* <NavBar /> */}
            {/* <Robots /> */}
        </BrowserRouter>
      )}
      </UserContext.Consumer>
  )
}

export default Main