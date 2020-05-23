import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskService } from './task.service';
import * as moment from 'moment';

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

  public actionTask(task: any, event): void {
    if (event.checked) {
      this.taskService
        .addAction({task: task._id, date: new Date().toISOString()})
        .subscribe(() => {
          this.updateTaskList();
        });
    } else {
      this.taskService
        .removeAction(task.lastAction._id)
        .subscribe(() => {
          this.updateTaskList();
        });
    }
  }

  public isActionDone(task): boolean {
    if (task.lastAction) {
      return new Date(task.start) < new Date(task.lastAction.date);
    }

    return false;
  }

  private updateTaskList() {
    this.taskService.getTasks()
      .subscribe((tasks) => {
        this.taskList = tasks;

        const now = moment();

        this.taskList.forEach((task) => {
          const startDate = moment(task.start);

          switch (task.frequency) {
            case 'daily':
              startDate.set({
                dayOfYear: now.dayOfYear(),
                year: now.year()
              });

              if (startDate.isAfter(now)) {
                startDate.subtract(task.interval, 'days');
              }

              break;
            case 'weekly':
              startDate.set({
                week: now.week(),
                year: now.year()
              });

              if (startDate.isAfter(now)) {
                startDate.subtract(task.interval, 'weeks');
              }
              break;
            default:
              console.log(task.name, task.frequency);
          }

          task.start = startDate.toISOString();
        });
      });
  }
}
