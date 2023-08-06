import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../Cotext/Notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
const Notes = () => {
  const context=useContext(noteContext);
  const{notes,GetNote}=context;
  useEffect(()=>{
    GetNote()
  },[])
  const ref=useRef(null)
  const updateNote=((currentNote)=>{
    ref.current.click();
    setNote({etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  })
  const[note,setNote]=useState({etitle:"",edescription:"",etag:""})
  const handleclick=(e)=>{
    console.log("updating notes")
       e.preventDefault();
       
      //  setNote({title:"",description:"",tag:""})
  }

  const onchange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }

  return (
    <>
    <AddNote/>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <div className="container my-2">
      
      <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">title</label>
            <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onchange}/>
            
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">description</label>
            <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange}/>
          </div>
          {/* <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button> */}
      </form>
      </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button"onClick={handleclick} class="btn btn-primary">Update Note</button>
        </div>
      </div>
    </div>
  </div>

    <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.map((note)=>{
             return <NoteItem key={note._id} note={note} updateNote={updateNote}/>
        })}
        
        
    </div>
    </>
  )
}

export default Notes