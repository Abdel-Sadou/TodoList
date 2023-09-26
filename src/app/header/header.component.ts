import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {AddTaskComponent} from "../add-task/add-task.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

@Output()
keysWordPut: EventEmitter<string> = new EventEmitter<string>();
  keysWord: string="";



  constructor() { }

  ngOnInit(): void {

  }

  findTask() {
    console.log("im there")
      this.keysWordPut.emit(this.keysWord);
  }
}
