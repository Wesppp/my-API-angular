const express = require("express");
const subjectController = require('./controllers/subject')

const cors = require('cors')
const app = express();
const jsonParser = express.json();
const port = 3002;

app.get("/api/subjects", subjectController.getAll);

app.get("/api/subjects/:id", subjectController.getById);

app.post("/api/subjects", jsonParser, subjectController.save);

app.delete("/api/subjects/:id", subjectController.delete);

app.put("/api/subjects", jsonParser, subjectController.update);

app.use(cors())
const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);

  console.log(`Server listening on port ${server.address().port}`);
});
