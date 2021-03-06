import { createRef, useState, useContext } from 'react'
import env from 'react-dotenv';
import UserContext from "../contexts/UserContext"
import uploadIcon from '../images/upload-icon.svg'

const AddNewRobotCard = (props) => {
  
  const UserContextData = useContext(UserContext);

  const [file, setFile] = useState({})
  const [input, setInput] = useState({
    robotName: ''
  })
  const [isSending, setIsSending] = useState(false)

  const handleChange = (event) => setInput({...input,
    [event.currentTarget.name]: event.currentTarget.value
  })

  const fileRef = createRef()


  const pickFile = () => {
    fileRef.current.click();
  };

  const loadFile = () => {
    setFile({
      file: fileRef.current.files[0],
      image: URL.createObjectURL(fileRef.current.files[0])})
  }

  const clearData = () => {
    URL.revokeObjectURL(file.file)
    setFile({})
    setInput({
      robotName: ''
    })
  }

  const sendFile = () => {
    setIsSending(true)
    let data = new FormData()
    data.append('image', file.file);
    data.append('name', input['robotName'])

    fetch(`https://mondo-robot-art-api.herokuapp.com/robots`, {
      method: 'POST',
      headers:{
        'x-robot-art-api-key': env.API_KEY,
        Authorization: `Bearer ${UserContextData.userData.token}`,
        // 'Content-Type': 'multipart/form-data',
      },
      body: data
    })
      .then((response) => {
        if (response.ok) {
          setFile({})
          setInput({
            robotName: ''
          })
          setIsSending(false)
          props.getRobots()
        } else {
          setIsSending(false)
          throw new Error('Robot Upload Failed');
        }
      })

  }

  return (
    <div className="new-robot-card">
      <h3>Add New Robot</h3>
      <div className="new-robot-input-box">
        <label htmlFor="robotName">Name</label>
        <input type="text" name="robotName" value={input['robotName']} onChange={handleChange} />
      </div>
      { file.file ? <img className="loaded-file" alt={input['robotName']} src={file.image} /> : <div onClick={pickFile} className="upload-file"><img className="upload-icon" alt="Upload File Icon" src={uploadIcon} /><h3>Select image to upload</h3></div> }
      <input style={{ display: 'none' }} type="file" ref={fileRef} onChange={loadFile} />
      <div className="admin-button-div">
        <button className="clear-robot-button" onClick={clearData}>Clear</button>
        <button className="add-robot-button" disabled={!file.file || !input['robotName'] || isSending} onClick={sendFile}>Add Robot</button>

      </div>
    </div>
  )
}

export default AddNewRobotCard