const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const { notes } = require('./data/db.json');
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));








app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  res.json(result);
});



//function findById(id, notesArray) {
  //const result = notesArray.file
//}

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, './data/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

app.post('/api/notes', (req, res) => {
  req.body.id = notes.length.toString();
  const note = createNewNote(req.body, notes)
  res.json(note);
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log('API server now on port ${PORT}!');
});