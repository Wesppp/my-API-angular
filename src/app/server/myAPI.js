const express = require("express");
const Subject = require('./model.js')

const cors = require('cors')
const app = express();
const jsonParser = express.json();
const port = 3002;

app.get("/api/subjects", async function (req, res) {
  const subjects = await Subject.getAll()
  res.send(subjects);
});

app.get("/api/subjects/:id", async function (req, res) {
  const id = req.params.id;
  let subject = await Subject.getById(id)

  if (subject) {
    res.send(subject);
  } else {
    res.status(404).send();
  }
});

app.post("/api/subjects", jsonParser, async function (req, res) {

  if (!req.body) return res.sendStatus(400);

  let subjects = await Subject.getAll()
  const id = Math.max.apply(Math, subjects.map(function (o) {
    return o.id;
  }))

  let subject = new Subject(req.body.name, id+1)
  await subject.save()
  res.send(subject);
});

app.delete("/api/subjects/:id", async function (req, res) {
  let subject = await Subject.deleteSubject(req.params.id)

  if (subject) {
    res.send(subject);
  } else {
    res.status(404).send();
  }
});

app.put("/api/subjects", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  let subject = new Subject(req.body.name, req.body.id)

  if (subject) {
    subject = Subject.updateSubject(subject)
    res.send(subject);
  } else {
    res.status(404).send(subject);
  }
});

app.use(cors())
const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);

  console.log(`Server listening on port ${server.address().port}`);
});

