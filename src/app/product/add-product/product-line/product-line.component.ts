import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-product-line',
  templateUrl: './product-line.component.html',
  styleUrls: ['./product-line.component.scss']
})
export class ProductLineComponent implements OnInit {
  @Input() private placeList: any[];
  @Input() private productList: any[];

  public filteredProductList: Observable<any[]>;
  public productForm: FormGroup;
  public units = [
    'kilogram',
    'gram',
    'liter',
    'unit'
  ];

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      quantity: [null, Validators.required],
      unit: [null],
      price: [null, Validators.required],
      date: [null],
      place: [null],
    });
  }

  ngOnInit(): void {
    this.filteredProductList = this.productForm.controls.name.valueChanges
      .pipe(
        startWith(''),
        map((value) => this.filterName(value))
      );
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
    const productValues = this.productForm.getRawValue();
    this.productForm.setValue({
      name: product,
      quantity: product.quantity,
      unit: product.unit,
      price: product.price,
      date: productValues.date ? productValues.date : new Date().toISOString(),
      place: product.place,
    });
  }

}
