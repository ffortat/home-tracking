import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
  ) { }

  public getTasks(): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/task');
  }

  public addTask(task: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/task', task);
  }

  public addAction(action: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/action', action);
  }
}
