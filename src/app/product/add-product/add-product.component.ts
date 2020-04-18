import { Component, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductLineComponent } from './product-line/product-line.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @ViewChildren(ProductLineComponent) productLines !: QueryList<ProductLineComponent>;

  public placeList: any[];
  public productLineList: any[];
  public productList: any[];

  constructor(
    private productService: ProductService,
    private dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.placeList = this.productService.getPlaces();

    this.productLineList = [{}];
    this.productList = this.filterProductList();
  }

  ngOnInit(): void {
  }

  public addProductLine(): void {
    this.productLineList.push({});
  }

  public addProducts(): void {
    this.dialogRef.close(this.productLines.map((productLine) => {
      const product = productLine.productForm.getRawValue();
      const productName = product.name;
      product.name = productName.name ? productName.name : productName;
      return product;
    }));
  }

  private filterProductList(): any[] {
    const productList = [];

    this.data.productList.forEach((newProduct) => {
      const productIndex = productList.findIndex((product) => product.name === newProduct.name);

      if (productIndex === -1) {
        productList.push(newProduct);
      } else if (productList[productIndex].date < newProduct.date) {
        productList[productIndex] = newProduct;
      }
    });

    return productList;
  }
}
