import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment.prod";
import {Observable} from "rxjs";
import {TaskTodo} from "../model/task";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class TaskTodoService {
  private host = environment.host

  constructor(private http: HttpClient) {
  }

  getAllTaskTodo(): Observable<TaskTodo[]> {
    return this.http.get<TaskTodo[]>(this.host + "/TaskTodos");
  }

  getEndOfTaskTodos(): Observable<TaskTodo[]> {
    return this.http.get<TaskTodo[]>(this.host + "/TaskTodos?isEnd=true");
  }

  getCurrentTasks(): Observable<TaskTodo[]> {
    let currentDate = new Date().getFullYear()+"-"+(new Date().getUTCMonth()+1)+"-"+new Date().getDate()
    return this.http.get<TaskTodo[]>(this.host + "/TaskTodos?dueDate="+currentDate);
  }

  getUnfinishedOfTaskTodos(): Observable<TaskTodo[]> {
    return this.http.get<TaskTodo[]>(this.host + "/TaskTodos?isEnd=false");
  }

    getTaskTodosOfLevel(level: string): Observable<TaskTodo[]> {
    if (level == "all") return this.http.get<TaskTodo[]>(this.host + "/TaskTodos");
    else return this.http.get<TaskTodo[]>(this.host + "/TaskTodos?level=" + level);
  }


  getAvailableTaskTodos(): Observable<TaskTodo[]> {
    return this.http.get<TaskTodo[]>(this.host + "/TaskTodos?available=true");
  }

  searchTaskTodos(keyword: string): Observable<TaskTodo[]> {
    return this.http.get<TaskTodo[]>(this.host + "/TaskTodos?name_like=" + keyword);
  }


  deleteTaskTodo(TaskTodo: TaskTodo): Observable<void> {
    return this.http.delete<void>(this.host + "/TaskTodos/" + TaskTodo.id);
  }

  endOfTaskTodo(taskTodo: TaskTodo) {
    return this.updateTaskTodo(taskTodo);
  }

  saveTaskTodo(taskTodo: TaskTodo | undefined): Observable<TaskTodo> {
    return this.http.post<TaskTodo>(this.host + "/TaskTodos", taskTodo);
  }

  getTaskTodo(id?: number): Observable<TaskTodo> {
    return this.http.get<TaskTodo>(this.host + "/TaskTodos/" + id);
  }

  updateTaskTodo(p: TaskTodo): Observable<TaskTodo> {
    return this.http.put<TaskTodo>(this.host + "/TaskTodos/" + p.id, p);
  }

}
