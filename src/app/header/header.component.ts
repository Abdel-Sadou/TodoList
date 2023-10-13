import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {TaskComponent} from "../task/task.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

@Output() keysWordPut: EventEmitter<string> = new EventEmitter<string>();
          keysWord: string = "" ;


  constructor() {}

  ngOnInit(): void {

  }

  findTask() {
      this.keysWordPut.emit(this.keysWord);
  }
}
