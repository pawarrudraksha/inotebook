import React, { useContext,useEffect, useRef,useState } from 'react'
import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import {useNavigate } from 'react-router-dom';



const Notes = (props) => {
    const context=useContext(noteContext);
    let navigate= useNavigate()
    const {notes,getNotes,editNote}=context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate("/login")
        }
        // eslint-disable-next-line 
    },[])
    const updateNote=(currentNote)=>{
        ref.current.click()
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})        
    }
    const[note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})

    const handleClick=(event)=>{
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click()
        props.showAlert("Notes updated successfully","success")

    } 
    
    const onChange=(event)=>{
        setNote({...note,[event.target.name]:event.target.value})
    }
    const ref=useRef(null)
    let refClose=useRef(null)
    return (
        <>
        <AddNote showAlert={props.showAlert}/>
    
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Button
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form className="my-3">
                    <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="etitle"
                        name='etitle'
                        aria-describedby="emailHelp"
                        onChange={onChange}
                        value={note.etitle}
                    />
            
                    </div>
                    <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="edescription"
                        name="edescription"
                        onChange={onChange}
                        value={note.edescription}
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                        Tag
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="etag"
                        name="etag"
                        onChange={onChange}
                        value={note.etag}
                    />
                    </div>
                    
                
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.etitle.length<5 || note.edescription.length<5} type="submit" className="btn btn-primary" onClick={handleClick} >Update Note</button>
            </div>
            </div>
        </div>
        </div>
        <div className="row my-3">
            <h2>Your Notes</h2>
            <div className="row container mx-2">
                {notes.length===0 && "No notes to display"}
                {notes.map((note)=>{
                    return <NoteItem updateNote={updateNote} showAlert={props.showAlert} key={note._id} note={note}/>;
                })}
            </div>
        </div> 
        </>
       
    )
    }

export default Notes
