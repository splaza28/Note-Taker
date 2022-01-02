const { notes } = require('../data/db.json');
const router = require('express').Router();
const fs = require('fs');

router.get('/notes', (req, res) => {
    res.json(notes);
  });
  
  router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    res.json(result);
  });

  function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, '../data/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
  }
  

  router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = createNewNote(req.body, notes)
    res.json(note);
  });

  router.delete('/notes/:id', (req,res) => {
      
  })


  module.exports = router;

