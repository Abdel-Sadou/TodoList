import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskTodo} from "../../../model/task";

@Component({
  selector: 'app-item-task',
  templateUrl: './item-task.component.html',
  styleUrls: ['./item-task.component.css']
})
export class ItemTaskComponent implements OnInit {


  @Input() tasks ?:TaskTodo[];
  @Output() getDeleteTask :EventEmitter<TaskTodo> = new EventEmitter<TaskTodo>();
  @Output() getEditTask :EventEmitter<TaskTodo> = new EventEmitter<TaskTodo>();

  isEdit :boolean =false
  constructor() { }

  ngOnInit(): void {}

  deleteTask(t: TaskTodo) {
    this.getDeleteTask.emit(t);
  }

  editTask(t: TaskTodo) {
    this.getEditTask.emit(t);
    this.isEdit=false;
  }


  letEdit() {
   this.isEdit =true
  }
}
