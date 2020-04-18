import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  public placeList = [];

  constructor(
    private http: HttpClient
  ) {
    this.getPlaces().subscribe((places) => {
      this.placeList = places;
    });
  }

  public getPlaces(): Observable<any> {
    return this.http.get('http://localhost:8081/api/place');
  }
}
