import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EvenDriverService} from "../../service/even-driver.service";
import {ActionEvent, TaskTodo, TaskTypeOperation} from "../../model/task";

@Component({
  selector: 'add-taskTodo',
  templateUrl: 'add-taskTodo.component.html',
  styleUrls: ['add-taskTodo.component.css']
})
export class AddTaskTodoComponent implements OnInit {

  formGroupTask !: FormGroup;
  submitted: boolean = false
  @Output() _onSaveTaskTodo: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder, private eventDriverService: EvenDriverService) {
  }

  ngOnInit(): void {
    this.formGroupTask = this.fb.group({
      name: ["", Validators.required],
      dueDate: ["", Validators.required],
      level: new FormControl('')
    })
  }

  saveTask() {
    this.submitted = true;

    if (this.formGroupTask.status === "VALID") {

      let actionEvent: ActionEvent = new ActionEvent();
      actionEvent.operation = TaskTypeOperation.ADD_TASK;
      let task: TaskTodo = new TaskTodo();
      task.name = this.formGroupTask.value["name"]
      task.level = this.formGroupTask.value["level"]
      task.dueDate = this.formGroupTask.value["dueDate"]
      task.isEnd = false;
      task.isEdit = false;

      actionEvent.payload = task;

      this.eventDriverService.publishEvent(actionEvent);
      this.openToast()
    }
  }

  openToast() {
    const  toast = document.querySelector('#liveToast');
    toast?.classList.add("show")
    setTimeout(()=>{
      toast?.classList.remove("show")
    },2000)
  }
}
