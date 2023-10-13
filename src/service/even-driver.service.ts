import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {ActionEvent} from "../model/task";

@Injectable({
  providedIn: 'root'
})
export class EvenDriverService {

   sourceEventSubject:Subject<ActionEvent> = new Subject<ActionEvent>();
   sourceEventSubjectObservable = this.sourceEventSubject.asObservable();

  constructor() { }

  publishEvent(event :ActionEvent){
    this.sourceEventSubject.next(event);
  }

}
