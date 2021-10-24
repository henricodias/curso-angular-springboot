package io.github.curso.todo.rest;

import io.github.curso.todo.model.Todo;
import io.github.curso.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/todos") //mapeia a URL para a qual serão feitas as requisições da API
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @PostMapping
    public Todo save(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    // url/api/todos/1
    @GetMapping("{id}")
    public Todo getById(@PathVariable Long id) {
        return todoRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}