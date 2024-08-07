require('dotenv').config();
const todoController = require("./controllers/todoController")
const express = require("express");

const cors = require("cors")
const mongoose = require("./db/connectDb")
const app = express();

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}))

app.get("/todos",todoController.getTodo);
app.post("/todos",todoController.createTodo);
app.put("/todos",todoController.updateTodo)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
