import RobotVoteControl from "./RobotVoteControl"

const RobotCard = (props) => {

  const controlSelect = () => {
    switch(props.from) {
      case 'robotVote':
        return <RobotVoteControl />
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