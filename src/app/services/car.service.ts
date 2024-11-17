import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  public baseUrl = 'http://localhost:8080/car/v1';

  constructor(private httpClient: HttpClient) { }

  public getCars(page:number,pageSize:number, maker?: string, showroomName?: string): Observable<any> {
    let queryParams = `page=${page}&size=${pageSize}`;
    if (maker) {
      queryParams += `&maker=${maker}`;
    }
    if (showroomName) {
      queryParams += `&showroomName=${showroomName}`;
    }

    return this.httpClient.get(this.baseUrl+`/all?${queryParams}`);
  }

  public createCar(car:any): Observable<any>{
    return this.httpClient.post(this.baseUrl+'/create',car)
  }
}
