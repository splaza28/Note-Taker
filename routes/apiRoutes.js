const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const {notes} = require('../db/db.json');

router.get('/api/notes', (req, res) => {
    let results = notes ;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });

  function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
  }
  
  router.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
      const note = createNewNote(req.body, notes);
      res.json(note);
    }
  );
  


module.exports = router;


  
  