require('dotenv').config();
const PORT = process.env.PORT
const todoController = require("./controllers/todoController")
const express = require("express");

const cors = require("cors")
const mongoose = require("./db/connectDb")
const app = express();

app.use(express.json());
app.use(cors())

app.get("/todos",todoController.getTodo);
app.post("/todos",todoController.createTodo);
app.put("/todos",todoController.updateTodo)
app.listen(PORT,()=>{console.log("your server is listining on port",PORT)})