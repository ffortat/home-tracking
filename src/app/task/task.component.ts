import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  public taskList = [];

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.updateTaskList();
  }

  public addTask(): void {
    this.dialog
      .open(AddTaskComponent, {data: {}})
      .afterClosed().subscribe((task) => {
        if (task) {
          const saveObservables = [];

          this.taskService
            .addTask(task)
            .subscribe(() => {
              this.updateTaskList();
            });
        }
      });
  }

  private updateTaskList() {
    this.taskService.getTasks()
      .subscribe((tasks) => {
        this.taskList = tasks;
      });
  }
}
