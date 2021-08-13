import { useContext, useEffect, useState } from 'react';
import env from 'react-dotenv';
import UserContext from '../contexts/UserContext';
import Loading from './Loading';
import RobotCard from './RobotCard';
import RobotVoteControl from './RobotVoteControl';

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
        'x-robot-art-api-key': env.API_KEY,
        Authorization: `Bearer ${UserContextData.userData.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          getRobots()
        } else {
          throw new Error('Vote Delete Failed');
        }
      })
      .catch((error) => {

      });

      
  }

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

      fetch('https://mondo-robot-art-api.herokuapp.com/votes', {
        method: 'GET',
        headers:{
          'x-robot-art-api-key': env.API_KEY,
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

          setUserVoteData({
            voteCast: voteCast,
            voteCastFor: voteCastFor,
            voteId: voteId,
            votesLoaded: true
          })
        })
        .catch((error) => {

        });
  }

  useEffect(() => {
    getRobots()

  }, []);

  return userVoteData.votesLoaded === true ? (
    <div className="robots"><h1>Robots</h1>
      {userVoteData.voteId ? <button className="deleteVote" onClick={deleteVote}>Delete Vote</button> : ''}
      <div className="robot-map">
      {robots.map((robot) => {
        return <RobotCard key={robot.id} name={robot.name} url={robot.url} id={robot.id} voteCast={userVoteData.voteCast} voteCastFor={userVoteData.voteCastFor} getRobots={getRobots}>
          <RobotVoteControl getRobots={getRobots} id={robot.id} voteCast={userVoteData.voteCast} voteCastFor={userVoteData.voteCastFor} />  
        </RobotCard>;
      })}

      </div>
    </div>
  ) : <Loading />;
};

export default Robots;
