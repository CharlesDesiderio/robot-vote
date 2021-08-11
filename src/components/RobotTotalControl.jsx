const RobotTotalControl = (props) => {
  return (
    <div>
      {props.voteCount} / {props.totalVotes}
      <progress value={props.voteCount} max={props.totalVotes} />
    </div>
  )
}

export default RobotTotalControl