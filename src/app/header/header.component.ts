import {Component, OnInit, ViewChild} from '@angular/core';
import {AddTaskComponent} from "../add-task/add-task.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  keysWord?: string;
@ViewChild("addTaskComponent")
addTaskComponent ?:AddTaskComponent


  constructor() { }

  ngOnInit(): void {
  }

  findTask() {

  }
}
