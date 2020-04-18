import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlaceService } from './place.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private placeService: PlaceService
  ) { }

  public getProducts(): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/product');
  }

  public addProduct(product): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/product', product);
  }

  public getPlaces(): any[] {
    return this.placeService.placeList;
  }
}
