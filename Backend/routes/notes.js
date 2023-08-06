const express=require('express');
const router=express.Router();
var fetchuser=require('../Middware/fetchuser');
const Note =require('../modules/Note');
const { body, validationResult } = require('express-validator')

//R1 get all the notes GET "api/auth/getuser"
router.get('/fetchnotes',fetchuser,async(req,res)=>{
    try {
    const notes=await Note.find({user:req.user.id});
    res.json(notes)
} catch (error) {
    console.error(error.msg);
    res.status(500).send("Some error occurs")
}
})

//R2 Add a notes using POST: "api/notes/addnotes"
router.post('/addnotes',fetchuser,[
    body('title','Enter valid title' ).isLength({min:3}),
    body('description','description must be at least 5 character').isLength({min:5}),],async(req,res)=>{
    try {
    const{title,description,tag}=req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note=new Note({
        title,description,tag,user:req.user.id
    })
    const savenote=await note.save();
    res.json(savenote)
} catch (error) {
    console.error(error.msg);
    res.status(500).send("Some error occurs")  
}
})

//Route 3 : update existing note "api/auth/updatenote"
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    try {
        const{title,description,tag}=req.body;
    //create newNote object
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    //find the note to be updated and update it
    let note=await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
} catch (error) {
    console.error(error.msg);
    res.status(500).send("Some error occurs")   
}
})

//Route 4 : delete existing note "api/auth/deletenote"
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try{
    const{title,description,tag}=req.body;
    //find the note to be deleted
    let note=await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}

    //Allow only if user own this note
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note=await Note.findByIdAndDelete(req.params.id,{new:true})
    res.json({"success":"Note has been deleted",note:note});
} catch (error) {
    console.error(error.msg);
    res.status(500).send("Some error occurs")   
}
})
module.exports=router