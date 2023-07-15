import React,{useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"
  


const AddNote = (props) => {
  const context=useContext(noteContext);
  const {addNote}=context ;
  const[note,setNote]=useState({title:"",description:"",tag:""})
  const handleClick=(event)=>{
    event.preventDefault()
    addNote(note.title,note.description,note.tag)
    props.showAlert("Notes added successfullly","success")
    setNote({title:"",description:"",tag:""})
  } 

  const onChange=(event)=>{
      setNote({...note,[event.target.name]:event.target.value})
  }
  return (

    <div>
      <div className="container my-4">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name='title'
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.title}
          />
  
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
          />
        </div>
        
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
      </div>
      
    </div>
  )
}

export default AddNote
