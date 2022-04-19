const express = require("express");
const fs = require("fs");

const cors = require('cors')
const app = express();
const jsonParser = express.json();
const port = 3002;

const filePath = "subjects.json";
app.get("/api/subjects", function (req, res) {
  const content = fs.readFileSync(filePath, "utf8");
  const subjects = JSON.parse(content);
  res.send(subjects);
});

app.get("/api/subjects/:id", function(req, res){
  const id = req.params.id; // получаем id
  const content = fs.readFileSync(filePath, "utf8");
  const subjects = JSON.parse(content);
  let subject = null;

  for(let i=0; i<subjects.length; i++){
    if(subjects[i].id==id){
      subject = subjects[i];
      break;
    }
  }

  if(subject){
    res.send(subject);
  }
  else{
    res.status(404).send();
  }
});

app.post("/api/subjects", jsonParser, function (req, res) {

  if (!req.body) return res.sendStatus(400);

  const subjectName = req.body.name;
  let subject = {name: subjectName};

  let data = fs.readFileSync(filePath, "utf8");
  let subjects = JSON.parse(data);

  const id = Math.max.apply(Math, subjects.map(function (o) {
    return o.id;
  }))
  subject.id = id + 1;
  subjects.push(subject);
  data = JSON.stringify(subjects);
  fs.writeFileSync("subjects.json", data);
  res.send(subject);
});

app.delete("/api/subjects/:id", function (req, res) {

  const id = req.params.id;
  let data = fs.readFileSync(filePath, "utf8");
  let subjects = JSON.parse(data);
  let index = -1;

  for (let i = 0; i < subjects.length; i++) {
    if (subjects[i].id == id) {
      index = i;
      break;
    }
  }
  if (index > -1) {

    const subject = subjects.splice(index, 1)[0];
    data = JSON.stringify(subjects);
    fs.writeFileSync("subjects.json", data);

    res.send(subject);
  } else {
    res.status(404).send();
  }
});

app.put("/api/subjects", jsonParser, function (req, res) {

  if (!req.body) return res.sendStatus(400);

  const subjectId = req.body.id;
  const subjectName = req.body.name;

  let data = fs.readFileSync(filePath, "utf8");
  const subjects = JSON.parse(data);
  let subject;
  for (let i = 0; i < subjects.length; i++) {
    if (subjects[i].id == subjectId) {
      subject = subjects[i];
      break;
    }
  }

  if (subject) {
    subject.name = subjectName;
    data = JSON.stringify(subjects);
    fs.writeFileSync("subjects.json", data);
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

