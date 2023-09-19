export class TaskTodo {
   id ?:string
   name ?:string
   dueDate ?:Date;
   level ?:string;
}

export  enum DataState {
  LOAD,
  LOADING,
  ERROR
}

export class AppDataState<T> {
  data ?: T
  state ?:DataState
  errorMessage?:string
}
