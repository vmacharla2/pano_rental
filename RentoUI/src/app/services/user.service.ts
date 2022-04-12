import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.api_url;
  constructor(private _http: HttpService) { }
  
authenticate(data):Observable<any>{
  return this._http.POST(`${this.url}/users/login`,data);
  }

loginCheck= new BehaviorSubject({loggedIn:false})

register(body){  
  return this._http.POST(`${this.url}/users`,body);
}

 
}



