import { HttpClient ,HttpHeaders,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
//   private _httpOptionsForPost = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
// } 

constructor(private _http:HttpClient) { }

POST(path: string, body): Observable<Object> {
  return this._http.post(path, body)
      
}
getContactRequests(path,id){
   
  return this._http.get(`${path}?id=${id}`) 
}
GET(path: string,qparams?): Observable<Object> {
  if(qparams)
  return this._http.get(path, {params: qparams});

  else return this._http.get(path);
}
postProperty(path,propertyDetails){
   return this._http.post(path,propertyDetails,{responseType: 'text'})
}
PUT(path,body){
  return this._http.put(path,body)
}

}
