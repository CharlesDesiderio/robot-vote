import { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext';
import RobotCard from './RobotCard';

const RobotResults = () => {
  let [robots, setRobots] = useState([]);
  let [votes, setVotes] = useState([]);
  let [dataLoaded, setDataLoaded] = useState(false);

  const UserContextData = useContext(UserContext);

  useEffect(() => {
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
        
        fetch('https://mondo-robot-art-api.herokuapp.com/votes', {
          method: 'GET',
          headers:{
            'x-robot-art-api-key': '346ee7ddde4bb72637e20fe9eff91306',
            Authorization: `Bearer ${UserContextData.userData.token}`,
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Votes Fetch Failed');
            }
          })
          .then((data) => {
            setVotes(data)
            setDataLoaded(true)
          })

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

console.log('votes', votes)
console.log(robots)

  return dataLoaded ? (
    <div>
      {robots.map((robot) => {
        return <RobotCard name={robot.name} url={robot.url} id={robot.id} totalVotes={votes.length} voteCount={votes.filter((vote) => vote.robot === robot.id).length} from="robotResults" />;
      })}
    </div>
  ) : 'loading...'
}

export default RobotResults