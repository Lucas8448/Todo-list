const express = require('express');
const database = require('sqlite3');

// todo list api server
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = new database.Database('./database.db');

db.run('CREATE TABLE IF NOT EXISTS todolist (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)')

app.get('/todolist', (req, res) => {
  db.all('SELECT * FROM todolist', (err, rows) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(rows);
    }
  });
});

app.get('/todolist/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM todolist WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(row);
    }
  });
});

app.post('/todolist', (req, res) => {
  const { title, content } = req.body;
  db.run('INSERT INTO todolist (title, content) VALUES (?, ?)', [title, content], (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.put('/todolist/:id', (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  db.run('UPDATE todolist SET title = ?, content = ? WHERE id = ?', [title, content, id], (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/todolist/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM todolist WHERE id = ?', [id], (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});