import {useEffect, useState} from "react";
import './home.css'

import axios from 'axios';

function Home (){
    const [todos,setTodos] = useState([]);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [editId,setEditId] = useState("")

    function handleTitleEvent(event) {setTitle(event.target.value);}
    function handleDescriptionEvent(event) {setDescription(event.target.value);}
    
    async function handleComplete(id){
        try {
            await axios.put(`/api/todos?id=${id}`, {
                task: "complete"
            });
            getTodos();
        } catch (error) {
            console.error("Error completing todo:", error);
        }
    }

    async function handleEdit(id){
        if(!editId){
            setEditId(id);
        }else{
            await axios.put(`/api/todos?id=${id}`,{
                title,
                description
            });
            setTitle("");
            setDescription(""); 
            getTodos();
        }
    }

    async function createTodo(title, description) {
        try {
            await axios.post("/api/todos", {title, description})
            setTitle("");
            setDescription(""); 
            getTodos();
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    }

    const getTodos = async ()=>{
        try {
            const response = await axios.get('/api/todos');
            setTodos(response.data.data)
        } catch (error) {
            console.error("Error completing todo:", error);
            // Optionally, show an error message to the user
        }
    }

    useEffect(()=>{
        getTodos();
    },[])

    return (
        <div className="todoContainer">
            <h1 className="todoContainerTitle">My Todo List</h1>    
            <div className="createTodoContainer">
                <input 
                className="title" 
                type="text" 
                onChange={handleTitleEvent} 
                placeholder="Title"
                />
                <input 
                className="description" 
                type="text" 
                onChange={handleDescriptionEvent} 
                placeholder="Description"
                />
                <button className = "createTodo"onClick={()=>{createTodo(title,description)}}>Create Todo</button>
            </div>
                <hr className="line"/>
            <div className="todos">
            {todos.map((todo, index) => (
                <div key={index} className="todoItem">
                    {editId===todo._id?
                        <div>
                            <input 
                            className="ediTitle" 
                            type="text"
                            onChange={handleTitleEvent} 
                            placeholder="Title"
                            />
                            <input 
                            className="editDescription" 
                            type="text" 
                            onChange={handleDescriptionEvent} 
                            placeholder="Description"
                            />
                        </div>:
                        <div>
                            <h2 className="todoTitle">{todo.title}</h2>
                            <p className="todoDescription">{todo.description}</p>
                        </div>
                    }
                    {editId===todo._id?
                    <span><button className="todoCancel" onClick={()=>{getTodos()}}>Cancel</button></span>
                   :<span><button className="todoComplete" onClick={()=>{handleComplete(todo._id)}}>Complete</button></span>
                    }
                    {editId===todo._id?<span><button className="submitTodo" onClick={()=>{handleEdit(todo._id)}}>submit</button></span>
                    :<span><button className="editTodo" onClick={()=>{handleEdit(todo._id)}}>Edit Todo</button></span>}
                    
                </div>
            ))}
            </div>
        </div>
    )
}

export default Home