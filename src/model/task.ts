import {FormGroup} from "@angular/forms";

export class TaskTodo {
   id ?:string
   name ?:string
   isEdit :boolean= false
   dueDate ?:Date;
   level ?:string;
   isEnd ?:boolean=true;

}
export class ActionEvent {
   payload ?: any;
   operation ?:TaskTypeOperation

}

export  enum DataState {
  LOAD,
  LOADING,
  ERROR
}
export  enum TaskTypeOperation {
  DELETE_TASK,
  ADD_TASK,
  EDIT_TASK,
  GET_TASK,
  GET_END_TASK,
  GET_TASK_OF_CATEGORY,
  GET_CURRENT_TASK,
  GET_UNFINISHED_TASK,
  END_OF_TASK,
  GET_TASK_FOR_LEVEL,
  SEARCH_TASK,
}

export class AppDataState<T> {
  data ?: T
  state ?:DataState
  errorMessage?:string
}
