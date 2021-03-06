import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiURL: string = 'http://localhost:8080/api/todos';

  constructor(
    private http: HttpClient
  ) { }

  salvar(todo: Todo) : Observable<Todo> {
    return this.http.post<Todo>(this.apiURL, todo)
  }

  listar() : Observable<Todo[]>{
    return this.http.get<Todo[]>(this.apiURL);
  }

  deletar(todo: Todo) : Observable<void> {
    const url = `${this.apiURL}/${todo.id}`
    return this.http.delete<void>(url)
  }

  marcarComoConcluido(todo: Todo) : Observable<Todo> {
    const url = `${this.apiURL}/${todo.id}/done`
    return this.http.patch<Todo>(url, {})
  }
}
