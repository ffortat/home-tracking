import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  public getProducts(): Observable<any> {
    return this.http.get('http://localhost:8081/api/product');
  }

  public addProduct(product): Observable<any> {
    return this.http.post('http://localhost:8081/api/product', product);
  }
}
