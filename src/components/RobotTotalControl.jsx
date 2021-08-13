const RobotTotalControl = (props) => {

  let calcWidth = `${( props.voteCount / props.totalVotes) * 100}%`

  return (
    <div className="robot-total-control">
      <div className="vote-count"><h2>{props.voteCount}</h2><h3>/{props.totalVotes}</h3><br /></div>
      <div className="progress-container">
      {/* <progress className="total-progress" value={props.voteCount} max={props.totalVotes} /> */}
      <div className="total-progress" style={{ width: calcWidth }}></div>
      </div>
    </div>
  )
}

export default RobotTotalControl