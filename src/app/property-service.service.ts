import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {

  constructor(private http:HttpClient) { }
  addproperty(data:any):Observable<any>{
  return this.http.post("http://localhost:8080/admins",data)
  }

  getpropertylist():Observable<any>{
    return this.http.get("http://localhost:8080/admins")
    }

    updateproperty(id:number,data:any):Observable<any>{
      return this.http.put(`http://localhost:8080/admins/${id}`,data)
      }

      deleteproperty(id:number):Observable<any>{
        return this.http.delete(`http://localhost:8080/admins/${id}`)
        }      
}
