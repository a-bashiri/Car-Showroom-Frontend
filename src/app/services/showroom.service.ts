import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowroomService {
  public baseUrl = 'http://localhost:8080/showroom/v1';

  constructor(private httpClient: HttpClient) { }

  public getShowrooms(page:number,pageSize:number, sortField: string, sortDirection: string): Observable<any> {
    return this.httpClient.get(this.baseUrl+`/all?page=${page}&size=${pageSize}&sort=${sortField},${sortDirection}`);
  }
  public getShowroomsWithoutPage(){
    return this.httpClient.get(this.baseUrl+'/all-no-page')
  }

  public createShowroom(showroom:any): Observable<any>{
    return this.httpClient.post(this.baseUrl+'/create',showroom)
  }

  public getShowroom(name:string): Observable<any>{
    return this.httpClient.get(this.baseUrl+`/${name}`);
  }
  public updateShowroom(showroom:any): Observable<any>{
    return this.httpClient.put(this.baseUrl+'/update',showroom)
  }
  public deleteShowroom(name:string): Observable<any>{
    return this.httpClient.delete(this.baseUrl+`/delete/${name}`)
  }
}
