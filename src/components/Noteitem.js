import React, {useContext} from 'react'
import noteContext from '../Context/notes/noteContext';

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const  {deleteNote} = context;
  const  {note, updateNote} = props;
  return (
    <div className='col-md-3'>
      <div className="card my-3">
        <div className="card-body">
            <div className='d-flex align-items.center'>
                <h5 className="card-title">{note.title}</h5>
                <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully", "success")}}></i>
                <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
            </div>
            <p className="card-text">{note.description}</p>
            {note.file && <a href={`http://localhost:5000/${note.file}`} target="_blank" rel="noreferrer">View File</a>}
            {/* {note.file && (
            <>
            {note.file.match(/\.(jpeg|jpg|gif|png)$/) && (
              <img src={`http://localhost:5000/${note.file}`} alt="Uploaded" style={{ width: '100%', maxHeight: '100%' }} />
            )}

            {note.file.match(/\.(mp4|webm|ogg)$/) && (
              <video controls style={{ width: '100%' }}>
                <source src={`http://localhost:5000/${note.file}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {note.file.match(/\.pdf$/) && (
              <iframe
                src={`http://localhost:5000/${note.file}`}
                width="100%"
                height="100%"
                title="PDF Viewer"
              ></iframe>
            )}
            </>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default Noteitem
