require('dotenv').config();
const PORT = process.env.PORT
const todoController = require("./controllers/todoController")
const express = require("express");

const cors = require("cors")
const mongoose = require("./db/connectDb")
const app = express();

app.use(express.json());
app.use(cors())

app.get("api/todos",todoController.getTodo);
app.post("api/todos",todoController.createTodo);
app.put("api/todos",todoController.updateTodo)

module.exports = app