import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import {Link, useNavigate } from 'react-router-dom';
import Image1 from './Screenshot 2025-01-23 104647.png';
import Image2 from './Screenshot 2025-01-23 105439.png';

const Notes = (props) => {
    const context = useContext(noteContext);
    let navigate = useNavigate();
    const {notes, getNotes, editNote} = context;
    useEffect(()=> {
      if(localStorage.getItem('token')){
        console.log(localStorage.getItem('token'));
        getNotes()
      }
      else{
        navigate("/login")
      }
      // eslint-disable-next-line
    },[])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note,setNote] = useState({id: "", etitle: "", edescription: "",etag: "",efile: null})
    const fileInputRef = useRef(null);
    

    const updateNote = (currentNote)=>{
      ref.current.click();
      setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag, efile: currentNote.file})
    }

    const handleClick =(e)=>{
      editNote(note.id, note.etitle, note.edescription, note.etag, note.efile)
      refClose.current.click();
      props.showAlert("Updated Successfully", "success")
    }

    const onChange =(e)=>{
      if (e.target.name === 'file') {
        setNote({ ...note, file: e.target.files[0] });
    } else {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    }

      const containerStyle = {
        display: "flex",
        height: "60vh",
      };
    
      const leftStyle = {
        flex: 1,
        backgroundColor: "#ffffff", // Light gray background for the left side
        padding: "20px",
        boxSizing: "border-box",
      };
    
      const rightStyle = {
        flex: 1,
        backgroundColor: "#ffffff", // White background for the right side
        padding: "20px",
        boxSizing: "border-box",
      };

  return (
    <>
    <div style={containerStyle}>
      <div style={leftStyle}>
      <img src={Image2} style={{width: "500px"}}></img>
      <h2>Your notebook on colud - safe and secure</h2>
      <p>An online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbancee. For more info you can checkout our <Link to="/about">About Page</Link></p>
      <Link to = "/addnote"><button className='btn-btn' style={{width: "200px", height: "50px", color: "white",backgroundColor: "purple", borderRadius: "4px"}} ><h5>Create New Note</h5></button></Link>
      </div>
      <div style={rightStyle}>
       <img src={Image1} style={{width: "700px"}}></img>
      </div>
    </div>
    
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal</button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Notes</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
            </button>
          </div>
          <div className="modal-body">
          <form className='container my-3'>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name = "etitle" value = {note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value = {note.edescription} onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" value = {note.etag} onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
            <label htmlFor="tag" className="form-label">File</label>
            <input type="file" className="form-control" id="file" name="file" ref={fileInputRef} onChange={onChange}/>
        </div>
          </form>
          </div>
          <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
          </div>
        </div>
      </div>
    </div>
    <div className='row my-3'>
      <h1 style={{fontWeight: "bold"}}>Your Notes:</h1>
      <div className="container">
      {notes.length===0 && 'No notes to display'}
      </div>
      {notes.map((note)=>{
        return <Noteitem key={note._id} updateNote={updateNote} showAlert = {props.showAlert} note={note}/>
      })}
      </div>
      </>
  )
}

export default Notes
