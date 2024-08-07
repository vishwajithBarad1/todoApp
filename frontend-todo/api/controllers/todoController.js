const { todoModel } = require("../models/todoModel")

exports.getTodo = async (req,res) =>{
    try{
        const todos = await todoModel.find({completed:false})
        res.status(200).json({
            success:true,
            data:todos
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.createTodo = async (req,res) =>{
    try{
        const {title, description} = req.body
        const todo = await todoModel({
            title,
            description
        })
        await todo.save()
        res.status(201).json({
            success:true,
            message:"created todo successfully",
            data:todo,

        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateTodo = async (req,res)=>{
    try{
        const {id}=req.query;
        const {task,title,description} = req.body;
        if(task === "complete" ){
            await todoModel.updateOne({_id:id},{completed:true})
            res.status(200).json({
                success:true,
                message:"todo marked completed successfully"
            })
        }else{
            await todoModel.updateOne({_id:id},{title,description});
            res.status(200).json({
                success:true,
                message:"todo updated successfully"
            })
        }
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}