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
        await axios.put(`http://localhost:4000/todos?id=${id}`,{
            task:"complete"
        });
        window.location.reload();
    }

    async function handleEdit(id){
        if(!editId){
            setEditId(id);
        }else{
            await axios.put(`http://localhost:4000/todos?id=${id}`,{
                title,
                description
            });
            setTitle("");
            setDescription(""); 
            window.location.reload();
        }
    }

    async function createTodo(title, description) {
        try {
            await axios.post("http://localhost:4000/todos", {title, description})
            setTitle("");
            setDescription(""); 
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    }

    const getTodos = async ()=>{
        const response = await axios.get('http://localhost:4000/todos');
        setTodos(response.data.data)
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
        
            <div className="todos">
            {todos.map((todo, index) => (
                <div key={index} className="todoItem">
                    {editId==todo._id?
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
                    {editId==todo._id?
                    <span><button className="todoCancel" onClick={()=>{window.location.reload()}}>Cancel</button></span>
                   :<span><button className="todoComplete" onClick={()=>{handleComplete(todo._id)}}>Complete</button></span>
                    }
                    <span><button className="editTodo" onClick={()=>{handleEdit(todo._id)}}>{editId==todo._id?"submit":"Edit Todo"}</button></span>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Home