
import todo from "../model/Todo.js"

export const addTodo = async (request, response) => {
    try {
        const newTodo = await todo.create({
            data: request.body.data,
            createdAt: Date.now()
        })

        await newTodo.save(); 

        return response.status(200).json(newTodo);
    } catch (e) {
        return response.status(500).json(e.message);
    }
}

export const getAllTodos = async (request, response) => {
    try {
        const todos = await todo.find({}).sort({ "createdAt": -1 });

        return response.status(200).json(todos);
    } catch (e) {
        return response.status(500).json(e.message);
    }
}

export const toggleTodoDone = async (request, response) => {
    try {
        const todoRef = await todo.findById(request.params.id);
        
        const todos = await todo.findByIdAndUpdate(
            { _id: request.params.id },
            { done: !todoRef.done}
        )
            
        return response.status(200).json(todos);
    } catch (e) {
        return response.status(500).json(e.message);
    }
}

export const updateTodo = async (request, response) => {
    try {        
        await todo.findOneAndUpdate(
            { _id: request.params.id },
            { data: request.body.data }
        )

        const TODO = await todo.findById(request.params.id);
            
        return response.status(200).json(TODO);
    } catch (e) {
        return response.status(500).json(e.message);
    }
}

export const deleteTodo = async (request, response) => {
    try {        
        const TODO = await todo.findByIdAndDelete(request.params.id)
            
        return response.status(200).json(TODO);
    } catch (e) {
        return response.status(500).json(e.message);
    }
}

