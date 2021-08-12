import { useEffect, useState, useContext } from 'react'
import AddNewRobotCard from "./AddNewRobotCard"
import UserContext from '../contexts/UserContext'
import RobotCard from './RobotCard'

const AdminView = () => {

  const [robots, setRobots] = useState([])

  const UserContextData = useContext(UserContext);

  const getRobots = () => {
    console.log(UserContextData);

    fetch('https://mondo-robot-art-api.herokuapp.com/robots', {
      method: 'GET',
      headers: {
        'x-robot-art-api-key': '346ee7ddde4bb72637e20fe9eff91306',
        Authorization: `Bearer ${UserContextData.userData.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Robot Fetch Failed');
        }
      })
      .then((data) => {
        setRobots(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getRobots()
  }, [])

  return robots.length > 0 ? (
    <div>
      <AddNewRobotCard getRobots={getRobots} />
      {robots.map((robot) => (
        <RobotCard name={robot.name} url={robot.url} id={robot.id} getRobots={getRobots} from="adminView" />
      ))}
    </div>
  ) : 'loading'
}

export default AdminView