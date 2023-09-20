import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {AppDataState, DataState, TaskTodo} from "../../model/task";
import {TaskTodoService} from "../../service/task.service";

@Component({
  selector: 'app-list-item-task',
  templateUrl: './list-item-task.component.html',
  styleUrls: ['./list-item-task.component.css']
})
export class ListItemTaskComponent implements OnInit {

  @Input() tasks$ ?: Observable<AppDataState<TaskTodo[]>>;
  readonly DataState = DataState;
   @Output() _onDeleteTask : EventEmitter<TaskTodo> = new EventEmitter<TaskTodo>();
   @Output() _onEditTask : EventEmitter<TaskTodo> = new EventEmitter<TaskTodo>();

  constructor(private taskService: TaskTodoService) {
  }

  ngOnInit(): void {

  }

  editTask(t: TaskTodo) {
    this._onEditTask.emit(t);
  }

  deleteTask(t: TaskTodo) {
    this._onDeleteTask.emit(t);
  }
}
