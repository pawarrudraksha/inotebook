import React,{useContext} from 'react'
import noteContext from "../context/notes/noteContext"
    
const NoteItem = (props) => {
    const context=useContext(noteContext)
    const {note,updateNote}=props;
    const {deleteNote}=context
  
    return (
        <div className="col-md-3">  
        <div className="card my-2">
        <div style={{position:'absolute',right:'0px',display:'flex',justifyContent:'flex-end'}}>
          <span className=" badge rounded-pill bg-secondary  " >{note.tag}</span>
          </div>
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Notes deleted successfully","success")}} ></i>
                <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note) }} ></i> 

            </div>
        </div>
        </div>
    )
    }

export default NoteItem
