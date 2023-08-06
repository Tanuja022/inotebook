import React, { useState } from "react";

import NoteContext from "./NoteContext";

const NoteState=(props)=>{
  const host="http://localhost:5000"
    const Noteinitial=[]
      const[notes,setNotes]=useState(Noteinitial)

//get all Note
const GetNote=async()=>{
  //api call
  const response = await fetch(`${host}/api/notes/fetchnotes`, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkNWY4MmFjZDVhMDE3MzU0ZjU2NDUxIn0sImlhdCI6MTY3NTA3ODcxM30.ihCG8FmLO3lRVsxfHnvS6_TN8KN43OS-7edHrgp8po4"
    },
   });

  const json= await response.json()
  console.log(json);
  setNotes(json);
 
}


      //Add Note
      const addNote=async(title,description,tag)=>{
        //api call
        const response = await fetch(`${host}/api/notes/addnotes`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkNWY4MmFjZDVhMDE3MzU0ZjU2NDUxIn0sImlhdCI6MTY3NTA3ODcxM30.ihCG8FmLO3lRVsxfHnvS6_TN8KN43OS-7edHrgp8po4"
          },
          body: JSON.stringify({title,description,tag}) 
        });
        // const json= response.json(); 
        console.log("Note is Added")
        const note={
            "_id": "63db434185c1edbfa68bce5ff2",
            "user": "63d5f82acd5a017354f56451",
            "title": title,
            "description": description ,
            "tag": tag,
            "date": "2023-02-02T04:59:04.649Z",
            "__v": 0
          };
        setNotes(notes.concat(note))
      }
      //delete note
      const deleteNote=async(id)=>{
        //api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkNWY4MmFjZDVhMDE3MzU0ZjU2NDUxIn0sImlhdCI6MTY3NTA3ODcxM30.ihCG8FmLO3lRVsxfHnvS6_TN8KN43OS-7edHrgp8po4"
          },
          
        });
        const json=await response.json(); 
        console.log(json);
        console.log("deleteting note id"+id)
        const newNotes=notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes);
      }
      //edit note
      const editNote=async(id,title,description,tag)=>{
        //api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkNWY4MmFjZDVhMDE3MzU0ZjU2NDUxIn0sImlhdCI6MTY3NTA3ODcxM30.ihCG8FmLO3lRVsxfHnvS6_TN8KN43OS-7edHrgp8po4"
          },
          body: JSON.stringify({title,description,tag}) 
        });
        const json=await response.json(); 
        console.log(json);
        //logic to edit client 
        for(let index=0;index<notes.length;index++){
          const element=notes[index];
          if(element._id===id){
            element.title=title;
            element.description=description;
            element.tag=tag;
          }
        }
        
      }

    return (
        <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,GetNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState