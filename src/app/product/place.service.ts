import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
    return this.http.get(environment.apiUrl + '/api/place');
  }
}
