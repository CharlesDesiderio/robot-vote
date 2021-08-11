import RobotTotalControl from "./RobotTotalControl"
import RobotVoteControl from "./RobotVoteControl"

const RobotCard = (props) => {

  const controlSelect = () => {
    switch(props.from) {
      case 'robotVote':
        return <RobotVoteControl id={props.id} voteCast={props.voteCast} voteCastFor={props.voteCastFor} />
      case 'robotResults':
        return <RobotTotalControl voteCount={props.voteCount} totalVotes={props.totalVotes} />
      default: 
        return
    }
  }

  return (
    <div>
      <h2>{props.name}</h2>
      <img alt={props.name} src={props.url} />

      {controlSelect()}
    </div>
  )
}

export default RobotCard