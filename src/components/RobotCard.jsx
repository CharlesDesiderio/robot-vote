const RobotCard = (props) => {

  return (
    <div>
      {props.name}
      <img src={props.url} />
    </div>
  )
}

export default RobotCard