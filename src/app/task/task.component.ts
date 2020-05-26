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
  public taskLists = {
    today: [],
    thisWeek: [],
    thisMonth: [],
    done: []
  };

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

  private updateTaskList(): void {
    this.taskService.getTasks()
      .subscribe((tasks) => {
        this.taskList = tasks;
        this.taskLists = {
          today: [],
          thisWeek: [],
          thisMonth: [],
          done: []
        };

        const now = moment();

        this.taskList.forEach((task) => {
          const startDate = moment(task.start);

          switch (task.frequency) {
            case 'daily':
              this.refreshStartDateDaily(startDate, now, task);
              if (this.isActionDone(task)) {
                this.taskLists.done.push(task);
              } else {
                this.taskLists.today.push(task);
              }
              break;
            case 'weekly':
              this.refreshStartDateWeekly(startDate, now, task);
              if (this.isActionDone(task)) {
                this.taskLists.done.push(task);
              } else {
                if (now.isAfter(startDate.clone().add(1, 'weeks').subtract(1, 'days'))) {
                  this.taskLists.today.push(task);
                } else {
                  this.taskLists.thisWeek.push(task);
                }
              }
              break;
            case 'monthly':
              this.refreshStartDateMonthly(startDate, now, task);
              if (this.isActionDone(task)) {
                this.taskLists.done.push(task);
              } else {
                if (now.isAfter(startDate.clone().add(1, 'months').subtract(1, 'days'))) {
                  this.taskLists.today.push(task);
                } else if (now.isAfter(startDate.clone().add(1, 'months').subtract(1, 'weeks'))) {
                  this.taskLists.thisWeek.push(task);
                } else {
                  this.taskLists.thisMonth.push(task);
                }
              }
              break;
            default:
              console.log(task.name, task.frequency);
          }
        });
      });
  }

  private refreshStartDateMonthly(startDate: moment.Moment, now: moment.Moment, task): void {
    startDate.set({
      month: now.month(),
      year: now.year()
    });

    if (startDate.isAfter(now)) {
      startDate.subtract(task.interval, 'months');
    }
    task.start = startDate.toISOString();
  }

  private refreshStartDateWeekly(startDate: moment.Moment, now: moment.Moment, task): void {
    startDate.set({
      week: now.week(),
      year: now.year()
    });

    if (startDate.isAfter(now)) {
      startDate.subtract(task.interval, 'weeks');
    }
    task.start = startDate.toISOString();
  }

  private refreshStartDateDaily(startDate: moment.Moment, now: moment.Moment, task): void {
    startDate.set({
      dayOfYear: now.dayOfYear(),
      year: now.year()
    });

    if (startDate.isAfter(now)) {
      startDate.subtract(task.interval, 'days');
    }
    task.start = startDate.toISOString();
  }
}
