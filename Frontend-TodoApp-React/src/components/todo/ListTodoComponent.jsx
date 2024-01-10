import { useEffect, useState } from "react";
import { deleteTodosUserById, getUserTodosByUserName } from "./api/TodosApiService";
import { useAuth } from "./security/AuthContext";
import {useNavigate} from 'react-router-dom'

function ListTodosComponent () {
    const today = new Date()
    const targeDate =  new Date(today.getFullYear()+12, today.getMonth(), today.getDay())

    // const todoList = [
    //     {id:1, description:'Learn React', done: false, targetDate: targeDate},
    //     {id:2, description:'Learn Mobile Apps', done: false, targetDate: targeDate},
    //     {id:3, description:'Learn English', done: false, targetDate: targeDate}
    // ]

  
    const [todoList, setTodoList] = useState([]);
    const [message, setDeleteMessage] = useState(null);    
    const navigate = useNavigate();

    //const context = useAuth();
    //const user = context.userName;
    const user = useAuth().userName;

    useEffect(
        () => refreshTodos(), []       
    )

    function refreshTodos () {
        getUserTodosByUserName(user)
        .then(response => {
            console.log(response)
            setTodoList(response.data)
        })
        .catch(error => console.log(error))
    }

    function deleteTodo(id) {
        console.log("Click delete " + id)

        deleteTodosUserById(user, id)
        .then((response) => {
            console.log(response)
            setDeleteMessage(`Todo with id ${id} delete successfully`)
            refreshTodos()
        })
        .catch(error => console.log(error))
    }

    function updateTodo(id) {        
        console.log("Click update button: " + id)
        navigate(`/todo/${id}`)
    }

    
    function addNewTodo() {
        navigate(`/todo/-1`)
    }

    

    return (
        <div className="container">
            <h1>List of TODOs</h1>
            {message!=null && <div className="alert alert-success"><strong>Success!</strong> {message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID:</th>
                            <th>Description:</th>
                            <th>is Done?</th>
                            <th>Target Date:</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>                    
                    </thead>
                    <tbody>
                        {
                            todoList.map ( 
                                todo => (
                                    <tr key = {todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate}</td>
                                        <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>delete</button></td>
                                        <td> <button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button> </td>                                        
                                    </tr>
                                )
                            )
                        }
                        
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={() => addNewTodo()}>Add New Todo </div>
        </div>
    )
}

export default ListTodosComponent