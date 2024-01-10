package com.in28minutes.rest.webservices.restfulwebservices.todo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Esta clase era util cuando harcodeabamos los datos, ahora tira de base de datos
// Comentada la anotación para usar TodoJpaResource. Esta clase ya no valdría pero la mantiene por conservar el código
//@RestController
public class TodoResource {

    private TodoService todoService;

    //injection by constructor
    public TodoResource(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping(path = "/users/{username}/todos")
    public List<Todo> getTodosByUserName(@PathVariable String username) {
        return todoService.findByUsername(username);
    }

    //find Todo by ID. La ruta es igual al delete o update, solo cambia la anotación. Igualmente desde  el frontend lo que cambia es el metodo de llamada Axios.get o Axios.delete
    @GetMapping(path = "/users/{username}/todos/{id}")
    public Todo retrieveTodo (@PathVariable String username, @PathVariable int id) {
        return todoService.findById(id);
    }

    //De momento no hace nada con el username
    @DeleteMapping(path = "/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodoByUserAndId(@PathVariable String username, @PathVariable int id) {
        todoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    //Update TODO
    @PutMapping(path = "/users/{username}/todos/{id}")
    public Todo updateTodo (@PathVariable String username, @PathVariable int id, @RequestBody Todo todo) {
        todoService.updateTodo(todo);
        return todo;
    }

    //Create TODO
    @PostMapping("/users/{username}/todos")
    public Todo createTodo(@PathVariable String username, @RequestBody Todo todo) {
        Todo createdTodo = todoService.addTodo(username, todo.getDescription(), todo.getTargetDate(),todo.isDone() );
        return createdTodo;
    }
}
