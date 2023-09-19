import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {catchError, from, map, Observable, of, startWith} from "rxjs";
import {TaskTodoService} from "../../service/task.service";
import {AppDataState, DataState, TaskTodo} from "../../model/task";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  formGroupTask !: FormGroup;
  tasks$ ?: Observable<AppDataState<TaskTodo[]>>
  submitted ?: boolean = false

  constructor(private fb: FormBuilder, private taskService: TaskTodoService, private router: Router) {
  }

  ngOnInit(): void {

    this.formGroupTask = this.fb.group({
      name: ["", Validators.required],
      dueDate: ["", Validators.required],
      level:  new FormControl(''),
    })

    this.getListOfTasks();
  }

  saveTask() {

      this.submitted = true;
      if (this.formGroupTask.status ==="VALID"){
        this.taskService.saveTaskTodo(this.formGroupTask.value).subscribe({
          next : val=>{},
          complete :()=>{
            console.log("save successfully");
            this.getListOfTasks();
          },
          error :error=>{
            console.log(error)
          }
        })
      }
  }


  getListOfTasks(): void {
    this.tasks$ = this.taskService.getAllTaskTodo().pipe(
      map((data) => {
        return ({data: data, state: DataState.LOAD})
      }),
      startWith({state: DataState.LOADING}),
      catchError(err => of({state: DataState.ERROR, errorMessage: err.message()})
      )
    );
  }

  deleteTask(t: TaskTodo) {
    this.taskService.deleteTaskTodo(t).subscribe({
      next: (val) => {

      },
      error: (err) => {

      },
      complete: () => {
        console.log("Delete successfully");
        this.getListOfTasks();
      }
    })

  }
}
