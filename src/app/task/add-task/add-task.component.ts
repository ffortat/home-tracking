import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  public taskForm: FormGroup;
  public frequencies = [
    'hourly',
    'daily',
    'weekly',
    'monthly',
    'yearly'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    const today = new Date();
    this.taskForm = this.formBuilder.group({
      name: [null],
      start: [new Date(today.getFullYear(), today.getMonth(), today.getDate())],
      frequency: [null],
    });
  }

  ngOnInit(): void {
  }

  public addTask(): void {
    this.dialogRef.close(this.taskForm.getRawValue());
  }
}
