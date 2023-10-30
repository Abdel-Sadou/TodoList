import {Component, OnInit} from '@angular/core';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {TaskTodoService} from "../../service/task.service";
import {AppDataState, DataState, TaskTodo, TaskTypeOperation} from "../../model/task";
import {EvenDriverService} from "../../service/even-driver.service";
import {gsap} from "gsap";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks$ ?: Observable<AppDataState<TaskTodo[]>>
  currentLevel: string = "all";
  currentCategorie: string = "all";
  message: string = '';
  type: string = '';

  constructor(private taskService: TaskTodoService, private eventDriverService: EvenDriverService) {
  }

  ngOnInit(): void {

    this.getListOfTasks();
    this.eventDriverService.sourceEventSubjectObservable.subscribe({
      next: (value) => {

        switch (value.operation) {

          case TaskTypeOperation.ADD_TASK:
            this.saveTask(value.payload);
            break;
          case TaskTypeOperation.GET_TASK:
            this.getListOfTasks();

            break;
          case TaskTypeOperation.GET_TASK_FOR_LEVEL:
            this.getTaskForLevel(value.payload);
            this.currentLevel = value.payload;
            break;

          case TaskTypeOperation.SEARCH_TASK:
            this.getTaskByKeywords(value.payload);
            break;

          case TaskTypeOperation.EDIT_TASK:
            this.editTask(value.payload);
            break;

          case TaskTypeOperation.END_OF_TASK:
            this.editTask(value.payload);
            break;

          case TaskTypeOperation.DELETE_TASK:
            this.deleteTaskTodo(value.payload);
            break;

          case TaskTypeOperation.GET_TASK_OF_CATEGORY:
            this.getTaskOfCategory(value.payload);
            this.currentCategorie = value.payload;
            break;
        }
      }, error: (err) => {

      }, complete: () => {

      },
    })
  }


  saveTask($event?: TaskTodo) {
    this.taskService.saveTaskTodo($event).subscribe({
      next: val => {
      },
      complete: () => {
        console.log("save successfully");
        this.getTaskForLevel(this.currentLevel);
        this.openToast()
        this.message = 'Successfully save Todo !';
        this.type='success'
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  getEndTaskTodos() {
    console.log("getEndOfTaskTodos :::");
    this.tasks$ = this.taskService.getEndOfTaskTodos().pipe(
      map((data) => {
        if (this.currentLevel != "all") data = data.filter(t => t.level == this.currentLevel);
        return ({data: data, state: DataState.LOAD})
      }),
      startWith({state: DataState.LOADING}),
      catchError(err => of({state: DataState.ERROR, errorMessage: err.message()})
      )
    );

  }

  getCurrentTasks() {
    this.tasks$ = this.taskService.getCurrentTasks().pipe(
      map((data) => {
        if (this.currentLevel != "all") data = data.filter(t => t.level == this.currentLevel);
        return ({data: data, state: DataState.LOAD})
      }),
      startWith({state: DataState.LOADING}),
      catchError(err => of({state: DataState.ERROR, errorMessage: err.message()})
      )
    );

  }

  getUnfinishedOfTaskTodos() {
    this.tasks$ = this.taskService.getUnfinishedOfTaskTodos().pipe(
      map((data) => {
        if (this.currentLevel != "all") data = data.filter(t => t.level == this.currentLevel);
        return ({data: data, state: DataState.LOAD})
      }),
      startWith({state: DataState.LOADING}),
      catchError(err => of({state: DataState.ERROR, errorMessage: err.message()})
      )
    );
  }


  getTaskForLevel(level: string) {
    if (level === "") {
      level = "all"
    }
    this.tasks$ = this.taskService.getTaskTodosOfLevel(level).pipe(
      map((data) => {
        switch (this.currentCategorie) {
          case 'completedTask':
            data = data.filter(t => t.isEnd);
            break;
          case 'unfinishedTasks':
            data = data.filter(t => !t.isEnd);
            break;
          case 'taskOfDay':
            let currentDate = new Date().getFullYear() + "-" + (new Date().getUTCMonth() + 1) + "-" + new Date().getDate();
            data = data.filter(t => t.dueDate?.toDateString() == currentDate);
            break;
        }
        return ({data: data, state: DataState.LOAD})
      }),
      startWith({state: DataState.LOADING}),
      catchError(err => of({state: DataState.ERROR, errorMessage: err.message()})
      )
    );
  }

  getTaskOfCategory(category: string) {
    switch (category) {
      case 'all':
        this.getListOfTasks();
        break;
      case 'completedTask':
        this.getEndTaskTodos();
        break;
      case 'unfinishedTasks':
        this.getUnfinishedOfTaskTodos();
        break;
      case 'taskOfDay':
        this.getCurrentTasks();
        break;
    }
  }

  getListOfTasks(): void {
    this.tasks$ = this.taskService.getAllTaskTodo().pipe(
      map((data) => {
        if (this.currentLevel != "all") data = data.filter(t => t.level == this.currentLevel);


        return ({data: data, state: DataState.LOAD})
      }),
      startWith({state: DataState.LOADING}),
      catchError(err => of({state: DataState.ERROR, errorMessage: err.message()})
      )
    );
  }

  getTaskByKeywords(keyword: string) {
    this.tasks$ = this.taskService.searchTaskTodos(keyword).pipe(
      map((data) => {
        return ({data: data, state: DataState.LOAD})
      }),
      startWith({state: DataState.LOADING}),
      catchError(err => of({state: DataState.ERROR, errorMessage: err.message()})
      )
    );
  }

  endOfTask(t: TaskTodo) {
    t.isEnd = true;
    this.taskService.endOfTaskTodo(t).subscribe({
      next: (val) => {

      },
      error: (err) => {

      },
      complete: () => {
      }
    })
  }

  editTask(t: TaskTodo) {
    this.taskService.updateTaskTodo(t).subscribe({
      next: (val) => {

      },
      error: (err) => {

      },
      complete: () => {
        console.log("suis laaaaaa")
        if (this.currentLevel != "all") this.getListOfTasks();
        if (this.currentCategorie != "all") this.getTaskOfCategory(this.currentCategorie)
      }
    })
  }

  deleteTaskTodo(t: TaskTodo) {
    this.taskService.deleteTaskTodo(t).subscribe({
      next: (val) => {

      },
      error: (err) => {

      },
      complete: () => {
        this.getListOfTasks();
        this.getTaskOfCategory(this.currentCategorie)
        this.openToast()
        this.message = 'Successfully delete Todo !';
        this.type='error'
      }
    })
  }

  openToast() {
    const toast = document.querySelector('#liveToast');
    toast?.classList.add("show")
    setTimeout(() => {
      toast?.classList.remove("show")
    }, 2000)
  }
}
