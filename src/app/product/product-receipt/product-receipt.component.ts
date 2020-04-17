import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-receipt',
  templateUrl: './product-receipt.component.html',
  styleUrls: ['./product-receipt.component.scss']
})
export class ProductReceiptComponent implements OnInit {
  @Input('products') public productList: any[];
  @Input('date') public date: string;

  public totalPrice = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.totalPrice = this.productList.map((product) => product.price).reduce((a, b) => a + b);
    this.totalPrice = Math.round(this.totalPrice * 100) / 100;
  }
}
