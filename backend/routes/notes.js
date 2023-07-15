const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");  

//Route 1 : Get all the notes :GET "api/notes/fetchallnotes.Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal sever error occured")
}
});

//Route 2 : add notes :Post"api/notes/addnotes".Login required
router.post("/addnotes",fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //If there are errors ,return Bad request and the errors
    try {
      const  title = req.body.title;
      const  description = req.body.description;
      const  tag  = req.body.tag;
      console.log("body",req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      console.log("Validation done");
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
      console.log("note saved");
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal sever error occured")
    }
  }
);

//Route 3 : update notes :put "api/notes/updatenotes/:id".Login required
router.put("/updatenotes/:id",fetchuser,async (req, res) => {
  const  title = req.body.title;
  const  description = req.body.description;
  const  tag  = req.body.tag;
  console.log("body",req.body);
    try {
    //Create a newNote object
    const newNote={};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}
  
    //Find the note to be updated and update it 
    console.log(newNote);
    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}; 
     

    if(note.user.toString() !==req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note= await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal sever error occured")
    } 
  })


//Route 4 : Delete note :Delete "api/notes/deletenote/:id".Login required
router.delete("/deletenote/:id",fetchuser,async (req, res) => {
    try {   
    //Find the note to be updated and update it 
    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")};

    // Allow deletion only if user owns this note
    if(note.user.toString() !==req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note= await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted"})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal sever error occured")
    }
  })


module.exports = router;
