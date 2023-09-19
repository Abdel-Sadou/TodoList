import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ItemTaskComponent } from './list-item-task/item-task/item-task.component';
import { ListItemTaskComponent } from './list-item-task/list-item-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddTaskComponent,
    ItemTaskComponent,
    ListItemTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
