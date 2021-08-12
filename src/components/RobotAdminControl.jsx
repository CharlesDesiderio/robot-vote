import { useContext } from 'react';
import UserContext from "../contexts/UserContext"

const RobotAdminControl = (props) => {

  const UserContextData = useContext(UserContext);

  const deleteRobot = () => {
    fetch(`https://mondo-robot-art-api.herokuapp.com/robots/${props.id}`, {
      method: 'DELETE',
      headers:{
        'x-robot-art-api-key': '346ee7ddde4bb72637e20fe9eff91306',
        Authorization: `Bearer ${UserContextData.userData.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          props.getRobots()
        } else {
          throw new Error('Robot Delete Failed');
        }
      })
  }

  return (
    <div>
      <button onClick={() => alert(`404 Feature Not Found`)}>Edit</button>
      <button onClick={deleteRobot}>Delete</button>
    </div>
  )
}

export default RobotAdminControl