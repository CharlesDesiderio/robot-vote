import UserContext from "../contexts/UserContext"

const Main = () => {
  return (
    <UserContext.Consumer>
      {context => (
        <div>
          Name: {context.userData.name}
        </div>
      )}
      </UserContext.Consumer>
  )
}

export default Main