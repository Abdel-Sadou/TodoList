import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment.prod";
import {Observable} from "rxjs";
import {TaskTodo} from "../model/task";

@Injectable({
  providedIn: 'root'
})
export class TaskTodoService {
  private host = environment.host
  constructor(private http :HttpClient) { }

  getAllTaskTodo():Observable<TaskTodo[]>{
    return this.http.get<TaskTodo[]>(this.host+"/TaskTodos");
  }

  getSelectedTaskTodos():Observable<TaskTodo[]>{
    return this.http.get<TaskTodo[]>(this.host+"/TaskTodos?selected=true");
  }

  getAvailableTaskTodos():Observable<TaskTodo[]>{
    return this.http.get<TaskTodo[]>(this.host+"/TaskTodos?available=true");
  }

  searchTaskTodos( keyword:string):Observable<TaskTodo[]>{
    return this.http.get<TaskTodo[]>(this.host+"/TaskTodos?name_like="+keyword);
  }


  deleteTaskTodo(TaskTodo:TaskTodo):Observable<void>{
    return this.http.delete<void>(this.host+"/TaskTodos/"+TaskTodo.id);
  }

  saveTaskTodo(TaskTodo:TaskTodo):Observable<TaskTodo>{
    return this.http.post<TaskTodo>(this.host+"/TaskTodos",TaskTodo);
  }

  getTaskTodo(id?:number):Observable<TaskTodo>{
    return this.http.get<TaskTodo>(this.host+"/TaskTodos/"+id);
  }

  updateTaskTodo(p:TaskTodo):Observable<TaskTodo>{
    return this.http.put<TaskTodo>(this.host+"/TaskTodos/"+p.id, p);
  }

}
