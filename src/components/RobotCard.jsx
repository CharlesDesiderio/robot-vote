const RobotCard = (props) => {

  return (
    <div className="robot-card">
      <h3>{props.name}</h3>
      <img className="robot-card-img" alt={props.name} src={props.url} />
      {props.children}
    </div>
  )
}

export default RobotCard