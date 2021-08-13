import { useEffect, useState, useContext } from 'react'
import AddNewRobotCard from "./AddNewRobotCard"
import UserContext from '../contexts/UserContext'
import RobotCard from './RobotCard'
import Loading from './Loading'
import env from 'react-dotenv'

const AdminView = () => {

  const [robots, setRobots] = useState([])

  const UserContextData = useContext(UserContext);

  const getRobots = () => {

    fetch('https://mondo-robot-art-api.herokuapp.com/robots', {
      method: 'GET',
      headers: {
        'x-robot-art-api-key': env.API_KEY,
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

      });
  }

  useEffect(() => {
    getRobots()
  }, [])

  return robots.length > 0 ? (
    <div className="admin-view">
      <h1>Admin</h1>
      <div className="robot-map">
        <AddNewRobotCard getRobots={getRobots} />
        {robots.map((robot) => (
          <RobotCard key={robot.id} name={robot.name} url={robot.url} id={robot.id} getRobots={getRobots} from="adminView" />
        ))}
        </div>
    </div>
  ) : <Loading /> }

export default AdminView