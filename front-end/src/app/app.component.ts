import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  todos: Todo[] = []
  form: FormGroup = new FormGroup({
    description: new FormControl('')
  })

  constructor(
    private service: TodoService
  ) {  }

  ngOnInit(){
    this.listarTodos()
  }

  listarTodos(){
    this.service.listar().subscribe(todoList => {
      console.log(todoList)
      this.todos = todoList
    })
  }

  submit(){
    const todo: Todo = { ...this.form.value }
    this.service
        .salvar(todo)
        .subscribe(savedTodo => {
          this.todos.push(savedTodo)
          this.form.reset()
        })
  }

  delete(todo: Todo){
    this.service.deletar(todo).subscribe({
      next: (response) => this.listarTodos()
    })
  }

  done(todo: Todo) {
    this.service.marcarComoConcluido(todo).subscribe({
      next: (todoAtualizado) => {
        todo.done = todoAtualizado.done
        todo.doneDate = todoAtualizado.doneDate 
      }
    })
  }
}