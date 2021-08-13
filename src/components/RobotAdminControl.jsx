import { useContext } from 'react';
import env from 'react-dotenv';
import UserContext from "../contexts/UserContext"

const RobotAdminControl = (props) => {

  const UserContextData = useContext(UserContext);

  const deleteRobot = () => {
    fetch(`https://mondo-robot-art-api.herokuapp.com/robots/${props.id}`, {
      method: 'DELETE',
      headers:{
        'x-robot-art-api-key': env.API_KEY,
        Authorization: `Bearer ${UserContextData.userData.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          props.getRobots()
        } else {
          throw new Error('Robot Delete Failed');
        }
      })
  }

  return (
    <div className="robot-admin-control">
      <button className="admin-edit-button" onClick={() => alert(`404 Feature Not Found`)}>Edit</button>
      <button className="admin-delete-button" onClick={deleteRobot}>Delete</button>
    </div>
  )
}

export default RobotAdminControl