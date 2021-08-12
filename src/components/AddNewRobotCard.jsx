import { createRef, useState, useContext } from 'react'
import UserContext from "../contexts/UserContext"


const AddNewRobotCard = (props) => {
  
  const UserContextData = useContext(UserContext);

  const [file, setFile] = useState({})
  const [input, setInput] = useState({
    robotName: ''
  })

  const handleChange = (event) => setInput({...input,
    [event.currentTarget.name]: event.currentTarget.value
  })

  const fileRef = createRef()

  const loadFile = () => {
    setFile({
      file: fileRef.current.files[0],
      image: URL.createObjectURL(fileRef.current.files[0])})
  }

  const sendFile = () => {

    let data = new FormData()
    data.append('image', file.file);
    data.append('name', input['robotName'])

    console.log(data)

    fetch(`https://mondo-robot-art-api.herokuapp.com/robots`, {
      method: 'POST',
      headers:{
        'x-robot-art-api-key': '346ee7ddde4bb72637e20fe9eff91306',
        Authorization: `Bearer ${UserContextData.userData.token}`,
        // 'Content-Type': 'multipart/form-data',
      },
      body: data
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          setFile({})
          setInput({
            robotName: ''
          })
          props.getRobots()
        } else {
          throw new Error('Robot Upload Failed');
        }
      })

  }

  return (
    <div>
      <img alt="Nothing yet" src={file.image} />
      <input type="text" name="robotName" value={input['robotName']} onChange={handleChange} />
      <input type="file" ref={fileRef} onChange={loadFile} />
      <button onClick={sendFile}>Send</button>
    </div>
  )
}

export default AddNewRobotCard