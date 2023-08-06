import React,{useContext} from 'react'
import noteContext from '../Cotext/Notes/NoteContext';
const NoteItem = (props) => {
  const context=useContext(noteContext);
  const{deleteNote}=context;
    const {note,updateNote}=props;
  return (
    <div className="col-md-3">
        <div class="card my-3">
        <div class="card-body">
            <h5 class="card-title">{note.title}</h5>
            <p class="card-text">{note.description} </p>
            <button class="btn btn-primary mx-2" onClick={()=>{deleteNote(note._id)}}>Delete</button>
            <button class="btn btn-primary" onClick={()=>{updateNote(note)}}>Edit</button>
        </div>
        </div>
    </div>
  )
}

export default NoteItem