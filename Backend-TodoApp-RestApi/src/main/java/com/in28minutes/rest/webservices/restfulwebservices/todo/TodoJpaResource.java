package com.in28minutes.rest.webservices.restfulwebservices.todo;

import com.in28minutes.rest.webservices.restfulwebservices.todo.repository.TodoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoJpaResource {

    private TodoRepository todoRepository;

    //injection by constructor
    public TodoJpaResource(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @GetMapping(path = "/users/{username}/todos")
    public List<Todo> getTodosByUserName(@PathVariable String username) {
        return todoRepository.findByUsername(username);
    }

    //find Todo by ID. La ruta es igual al delete o update, solo cambia la anotación. Igualmente desde  el frontend lo que cambia es el metodo de llamada Axios.get o Axios.delete
    @GetMapping(path = "/users/{username}/todos/{id}")
    public Todo retrieveTodo (@PathVariable String username, @PathVariable int id) {
        return todoRepository.findById(id).get();
    }

    //De momento no hace nada con el username
    @DeleteMapping(path = "/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodoByUserAndId(@PathVariable String username, @PathVariable int id) {
        todoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    //Update TODO
    @PutMapping(path = "/users/{username}/todos/{id}")
    public Todo updateTodo (@PathVariable String username, @PathVariable int id, @RequestBody Todo todo) {
        return todoRepository.save(todo); //save se usa para crear nuevos y para updates
    }

    //Create TODO
    @PostMapping("/users/{username}/todos")
    public Todo createTodo(@PathVariable String username, @RequestBody Todo todo) {
        todo.setUsername(username);
        //todo.setId(null);
        return todoRepository.save(todo);
    }
}
