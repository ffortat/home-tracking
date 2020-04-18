import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlaceService } from './place.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private placeService: PlaceService
  ) { }

  public getProducts(): Observable<any> {
    return this.http.get('http://localhost:8081/api/product');
  }

  public addProduct(product): Observable<any> {
    return this.http.post('http://localhost:8081/api/product', product);
  }

  public getPlaces(): any[] {
    return this.placeService.placeList;
  }
}
