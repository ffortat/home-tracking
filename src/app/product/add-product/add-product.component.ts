import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public productForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddProductComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      quantity: [null, Validators.required],
      unit: [null],
      price: [null, Validators.required],
      date: [null],
    });
  }

  ngOnInit(): void {
  }

  public addProduct(): void {
    this.dialogRef.close(this.productForm.getRawValue());
  }
}
