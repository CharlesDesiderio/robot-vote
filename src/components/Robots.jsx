import { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext';
import RobotCard from './RobotCard';

const Robots = () => {
  let [robots, setRobots] = useState([]);
  let [userVoteData, setUserVoteData] = useState({
    votesLoaded: false
  });

  const UserContextData = useContext(UserContext);

  const deleteVote = () => {
    fetch(`https://mondo-robot-art-api.herokuapp.com/votes/${userVoteData.voteId}`, {
      method: 'DELETE',
      headers:{
        'x-robot-art-api-key': '346ee7ddde4bb72637e20fe9eff91306',
        Authorization: `Bearer ${UserContextData.userData.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('deleted')
          getRobots()
        } else {
          throw new Error('Vote Delete Failed');
        }
      })

      .catch((error) => {
        console.log(error);
      });

      
  }

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
          
          let voteCast = data.filter((x) => x.user === UserContextData.userData.id).length > 0 ? true : false
          let voteCastFor = voteCast ? data.filter((x) => x.user === UserContextData.userData.id)[0].robot : ''
          let voteId = voteCast ? data.filter((x) => x.user === UserContextData.userData.id)[0].id : ''

          console.log(voteCast, voteCastFor)

          setUserVoteData({
            voteCast: voteCast,
            voteCastFor: voteCastFor,
            voteId: voteId,
            votesLoaded: true
          })
        })
        .catch((error) => {
          console.log(error);
        });
  }

  useEffect(() => {
    getRobots()

  }, []);

  return userVoteData.votesLoaded === true ? (
    <div>
      {userVoteData.voteId ? <button onClick={deleteVote}>Delete Vote</button> : ''}
      {robots.map((robot) => {
        return <RobotCard name={robot.name} url={robot.url} id={robot.id} voteCast={userVoteData.voteCast} voteCastFor={userVoteData.voteCastFor} getRobots={getRobots} from="robotVote" />;
      })}
    </div>
  ) : 'loading';
};

export default Robots;
