import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public productList = [];

  constructor(
    private dialog: MatDialog,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.updateProductList();
  }

  public addProduct(): void {
    this.dialog
      .open(AddProductComponent, {data: {productList: this.productList}})
      .afterClosed().subscribe((result) => {
        this.productService.addProduct(result)
          .subscribe(() => {
            this.updateProductList();
          });
      });
  }

  private updateProductList() {
    this.productService.getProducts()
      .subscribe((products) => {
        this.productList = products;
      });
  }
}
