import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {filter, Observable} from "rxjs";
import {ActionEvent, AppDataState, DataState, TaskTodo, TaskTypeOperation} from "../../model/task";
import {TaskTodoService} from "../../service/task.service";
import {EvenDriverService} from "../../service/even-driver.service";
import {gsap} from "gsap";

@Component({
  selector: 'app-list-item-task',
  templateUrl: './list-item-task.component.html',
  styleUrls: ['./list-item-task.component.css']
})
export class ListItemTaskComponent implements OnInit {

  @Input() tasks$ ?: Observable<AppDataState<TaskTodo[]>>;
  readonly DataState = DataState;
  filter: string = '';
  categorie: string = "all"
  actionEvent: ActionEvent = new ActionEvent();
  constructor(private taskService: TaskTodoService, private evenDriverService: EvenDriverService) {
  }

  ngOnInit(): void {
    gsap.from(".filter",{x:-600, ease:"elastic.out", duration:1})
    gsap.from(".indicator",{x:-600, ease:"elastic.out", duration:1})

    this.filter = "all";
  }


  _onSelectCategorie() {
    this.getTaskOfCategory(this.categorie)
  }


  getTaskOfCategory(category:string) {
    this.actionEvent.operation = TaskTypeOperation.GET_TASK_OF_CATEGORY;
    this.actionEvent.payload = category;
    this.evenDriverService.publishEvent(this.actionEvent);
  }

  getLevelTask (filter:string ) {
    this.actionEvent.payload = filter;
    this.filter = filter;
    this.actionEvent.operation = TaskTypeOperation.GET_TASK_FOR_LEVEL;
    this.evenDriverService.publishEvent(this.actionEvent);

  }

  getAllTask() {
    this.actionEvent.operation = TaskTypeOperation.GET_TASK;
    this.actionEvent.payload = {};
    this.evenDriverService.publishEvent(this.actionEvent);
    this.filter = 'all';
  }

  getEndTask() {
    this.actionEvent.operation = TaskTypeOperation.GET_END_TASK;
    this.actionEvent.payload = {};
    this.evenDriverService.publishEvent(this.actionEvent);
  }


  getCurrentTask() {
    this.actionEvent.operation = TaskTypeOperation.GET_CURRENT_TASK;
    this.actionEvent.payload = {};
    this.evenDriverService.publishEvent(this.actionEvent);
  }

  getUnfinishedTask() {
    this.actionEvent.operation = TaskTypeOperation.GET_UNFINISHED_TASK;
    this.actionEvent.payload = {};
    this.evenDriverService.publishEvent(this.actionEvent);
  }

}
