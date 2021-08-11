import { useContext } from 'react';
import UserContext from "../contexts/UserContext"

const RobotVoteControl = (props) => {
  
  const UserContextData = useContext(UserContext);

  const castVote = () => {

    let voteData = {
      robot: props.id
    }
    console.log(voteData)
    console.log(UserContextData.userData.token)

    fetch('https://mondo-robot-art-api.herokuapp.com/votes/', {
      method: 'POST',
      headers:{
        'x-robot-art-api-key': '346ee7ddde4bb72637e20fe9eff91306',
        Authorization: `Bearer ${UserContextData.userData.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(voteData)
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Votes Cast Failed');
        }
      })
      .then((data) => {
        console.log(data)
        props.getRobots()
      })
      .catch((error) => {
        console.log(error);
      });

  }

  return (
    <div>
      <button onClick={castVote} disabled={props.voteCast}>{ props.voteCastFor === props.id ? 'Vote Cast' : 'Vote' }</button>
    </div>
  )
}

export default RobotVoteControl