// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001; // Change this if you need a different port
const db = new sqlite3.Database('./mydb.sqlite3', (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    db.run(
      'CREATE TABLE tasks ( \
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
      description TEXT NOT NULL, \
      completed INTEGER NOT NULL DEFAULT 0, \
      created TEXT NOT NULL, \
      priority TEXT NOT NULL \
    )',
      (err) => {
        if (err) {
          console.error('Table already exists.');
        }
      }
    );
  }
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CREATE: Add a new task
app.post('/tasks', (req, res) => {
  const { description, completed, created, priority } = req.body;
  db.run(
    'INSERT INTO tasks (description, completed, created, priority) VALUES (?, ?, ?, ?)',
    [description, completed, created, priority],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// READ: Get all tasks
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// UPDATE: Edit an existing task
// UPDATE: Edit an existing task
app.put('/tasks/:id', (req, res) => {
  const { description, completed, priority } = req.body;
  const completedInt = completed ? 1 : 0; // Convert boolean to integer
  db.run(
    'UPDATE tasks SET description = ?, completed = ?, priority = ? WHERE id = ?',
    [description, completedInt, priority, req.params.id], // Use the converted integer
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ updated: this.changes });
    }
  );
});

// DELETE: Remove a task
app.delete('/tasks/:id', (req, res) => {
  db.run('DELETE FROM tasks WHERE id = ?', req.params.id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
