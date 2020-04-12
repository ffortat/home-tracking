import { Component, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductLineComponent } from './product-line/product-line.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @ViewChildren(ProductLineComponent) productLines !: QueryList<ProductLineComponent>;

  public productLineList: any[];

  constructor(
    private dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productLineList = [{}];
  }

  ngOnInit(): void {
  }

  public addProductLine(): void {
    this.productLineList.push({});
  }

  public addProducts(): void {
    this.dialogRef.close(this.productLines.map((productLine) => {
      const product = productLine.productForm.getRawValue();
      product.name = product.name.name;
      return product;
    }));
  }
}
