import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { history } from '../interface/data';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  arr : history[] | undefined;
  constructor(private http:HttpClient) { }
  getHistory():Observable<history[]>{
    return this.http.get<history[]>('http://localhost:3000/data');
  }
  postHistory(record:history){
    return this.http.post('http://localhost:3000/data',record,{
      observe: 'response',
    });
  }
}
