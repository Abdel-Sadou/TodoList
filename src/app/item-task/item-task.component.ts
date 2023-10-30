import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActionEvent, TaskTodo, TaskTypeOperation} from "../../model/task";
import {EvenDriverService} from "../../service/even-driver.service";
import {gsap} from "gsap";


@Component({
  selector: 'app-item-task',
  templateUrl: './item-task.component.html',
  styleUrls: ['./item-task.component.css']
})
export class ItemTaskComponent implements OnInit {


  @Input() tasks ?:TaskTodo[];

  id :string ="";
  actionEvent :ActionEvent = new ActionEvent();

  constructor(private evenDriverService :EvenDriverService) {}

  ngOnInit(): void {
    gsap.from(".task",{y:200, ease:"elastic.inOut", duration:.5,stagger:.1})
  }

  endOfTask(t:TaskTodo , isEnd:boolean) {
    t.isEnd = isEnd;
    this.actionEvent.operation = TaskTypeOperation.END_OF_TASK;
    this.actionEvent.payload = t;
    this.evenDriverService.publishEvent(this.actionEvent);
  }

  editTask(t: TaskTodo) {
    let actionEvent: ActionEvent = new ActionEvent();
    actionEvent.operation = TaskTypeOperation.EDIT_TASK;
    t.isEdit =false
    actionEvent.payload = t;
    this.evenDriverService.publishEvent(actionEvent);

  }

  deleteTask(t: TaskTodo) {
    let actionEvent: ActionEvent = new ActionEvent();
    actionEvent.operation = TaskTypeOperation.DELETE_TASK;
    actionEvent.payload = t;
    console.log(t)
    this.evenDriverService.publishEvent(actionEvent);
  }


  letEdit(t: TaskTodo) {
   t.isEdit =true
  }
}
