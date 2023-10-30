import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { TaskComponent } from './task/task.component';
import { ItemTaskComponent } from './item-task/item-task.component';
import { ListItemTaskComponent } from './list-item-task/list-item-task.component';
import {AddTaskTodoComponent} from "./add-taskTodo/add-taskTodo.component";
import {StoreModule, StoreRootModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { ToastComponent } from './toast/toast.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TaskComponent,
    ItemTaskComponent,
    ListItemTaskComponent,
    AddTaskTodoComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
