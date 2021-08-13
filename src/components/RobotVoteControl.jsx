import { useContext } from 'react';
import env from 'react-dotenv';
import UserContext from "../contexts/UserContext"

const RobotVoteControl = (props) => {
  
  const UserContextData = useContext(UserContext);

  let buttonDisabled = () => (props.voteCast || props.isCasting)

  const castVote = () => {

    props.setIsCasting(true)

    let voteData = {
      robot: props.id
    }

    fetch('https://mondo-robot-art-api.herokuapp.com/votes/', {
      method: 'POST',
      headers:{
        'x-robot-art-api-key': env.API_KEY,
        Authorization: `Bearer ${UserContextData.userData.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(voteData)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Votes Cast Failed');
        }
      })
      .then((data) => {
        props.getRobots()
      })
      .catch((error) => {
      });
  }

  return (
    <div className="vote-control-div">
      <button className="vote-control" onClick={castVote} disabled={buttonDisabled()}>{ props.voteCastFor === props.id ? 'Vote Cast' : 'Vote' }</button>
    </div>
  )
}

export default RobotVoteControl