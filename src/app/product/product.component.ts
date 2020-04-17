import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public productList = [];
  public receipts = {};
  public receiptKeys = [];

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
        if (result) {
          const saveObservables = [];

          result.forEach((product) => {
            saveObservables.push(this.productService.addProduct(product));
          });

          combineLatest(saveObservables).subscribe(() => {
            this.updateProductList();
          });
        }
      });
  }

  private updateProductList() {
    this.productService.getProducts()
      .subscribe((products) => {
        this.productList = products;
        this.sortIntoReceipts();
      });
  }

  private formatDate(dateInput: string): string {
    const date = new Date(dateInput);
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();

    if (day.length < 2) { day = '0' + day; }
    if (month.length < 2) { month = '0' + month; }

    return [year, month, day].join('-');
  }

  private sortIntoReceipts() {
    this.productList.forEach((product) => {
      const dateIndex = this.formatDate(product.date);

      if (!this.receipts[dateIndex]) {
        this.receipts[dateIndex] = [];
      }

      this.receipts[dateIndex].push(product);
    });

    this.receiptKeys = Object.keys(this.receipts).sort((a, b) => a === b ? 0 : a > b ? -1 : 1);
  }
}
