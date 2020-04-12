import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public filteredProductList: Observable<any[]>;
  public productForm: FormGroup;
  private productList: any[];

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
    this.productList = data.productList;
  }

  ngOnInit(): void {
    this.filteredProductList = this.productForm.controls.name.valueChanges
      .pipe(
        startWith(''),
        map((value) => this.filterName(value))
      );
  }

  public addProduct(): void {
    this.dialogRef.close(this.productForm.getRawValue());
  }

  public displayProductName(product): string {
    return product && product.name ? product.name : '';
  }

  private filterName(productName: string): string[] {
    const filterValue = productName && productName.toLowerCase ? productName.toLowerCase() : '';

    return this.productList
      .filter((product) => product.name.toLowerCase().includes(filterValue))
      .sort((a, b) => a.name === b.name ? 0 : a.name > b.name ? 1 : -1);
  }

  public fillFormWithProduct(product: any): void {
    this.productForm.setValue({
      name: product,
      quantity: product.quantity,
      unit: product.unit,
      price: product.price,
      date: new Date().toISOString()
    });

    console.log(product.date);
  }
}
