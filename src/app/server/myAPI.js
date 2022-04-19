const express = require("express");
const fs = require("fs");

const cors = require('cors')
const app = express();
const jsonParser = express.json();
const port = 3002;

const filePath = "subjects.json";
app.get("/api/subjects", function (req, res) {
  const content = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(content);

  res.send(users);
});

app.get("/api/subjects/:id", function(req, res){

  const id = req.params.id; // получаем id
  const content = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(content);
  let user = null;

  for(let i=0; i<users.length; i++){
    if(users[i].id==id){
      user = users[i];
      break;
    }
  }

  if(user){
    res.send(user);
  }
  else{
    res.status(404).send();
  }
});

app.post("/api/subjects", jsonParser, function (req, res) {

  if (!req.body) return res.sendStatus(400);

  const userName = req.body.name;
  const userAge = req.body.age;
  let user = {name: userName, age: userAge};

  let data = fs.readFileSync(filePath, "utf8");
  let users = JSON.parse(data);

  const id = Math.max.apply(Math, users.map(function (o) {
    return o.id;
  }))
  user.id = id + 1;
  users.push(user);
  data = JSON.stringify(users);
  fs.writeFileSync("subjects.json", data);
  res.send(user);
});

app.delete("/api/subjects/:id", function (req, res) {

  const id = req.params.id;
  let data = fs.readFileSync(filePath, "utf8");
  let users = JSON.parse(data);
  let index = -1;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      index = i;
      break;
    }
  }
  if (index > -1) {

    const user = users.splice(index, 1)[0];
    data = JSON.stringify(users);
    fs.writeFileSync("subjects.json", data);
    // отправляем удаленного пользователя
    res.send(user);
  } else {
    res.status(404).send();
  }
});

app.put("/api/subjects", jsonParser, function (req, res) {

  if (!req.body) return res.sendStatus(400);

  const userId = req.body.id;
  const userName = req.body.name;
  const userAge = req.body.age;

  let data = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(data);
  let user;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == userId) {
      user = users[i];
      break;
    }
  }

  if (user) {
    user.age = userAge;
    user.name = userName;
    data = JSON.stringify(users);
    fs.writeFileSync("subjects.json", data);
    res.send(user);
  } else {
    res.status(404).send(user);
  }
});

app.use(cors())
const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);

  console.log(`Server listening on port ${server.address().port}`);
});

