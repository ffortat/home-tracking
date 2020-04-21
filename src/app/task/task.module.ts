import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskComponent } from './task.component';



@NgModule({
  declarations: [
    AddTaskComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class TaskModule { }
