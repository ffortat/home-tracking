import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-receipt',
  templateUrl: './product-receipt.component.html',
  styleUrls: ['./product-receipt.component.scss']
})
export class ProductReceiptComponent implements OnInit {
  @Input('products') private productList: any[];
  @Input('date') public date: string;

  public displayedColumns = ['name', 'quantity', 'price'];
  public placeIds = [];
  public places = {};
  public totalPrice = 0;

  constructor(
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.totalPrice = this.productList.map((product) => product.price).reduce((a, b) => a + b);
    this.totalPrice = Math.round(this.totalPrice * 100) / 100;

    this.productList.forEach((product) => {
      if (!this.places[product.place]) {
        this.places[product.place] = {
          name: this.getPlaceName(product.place),
          price: 0,
          productList: []
        };
      }

      this.places[product.place].productList.push(product);
      this.places[product.place].price += product.price;
    });

    this.placeIds = Object.keys(this.places);

    this.placeIds.forEach((placeId) => {
      this.places[placeId].price = Math.round(this.places[placeId].price * 100) / 100;
    });
  }

  private getPlaceName(id: string): string {
    const placeFound = this.productService.getPlaces().find((place) => place._id === id);
    return placeFound ? placeFound.name : '';
  }
}
