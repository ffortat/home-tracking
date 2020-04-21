import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskComponent } from './task.component';
import { SharedMaterialModule } from '../../common/modules/shared-material.module';



@NgModule({
  declarations: [
    AddTaskComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
  ],
  exports: [
    TaskComponent,
  ]
})
export class TaskModule { }
