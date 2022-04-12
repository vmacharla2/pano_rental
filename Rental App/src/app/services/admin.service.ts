import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable,of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  vProperties =[];
  verified = new BehaviorSubject({status:"error"})
  fetechedVrificationProperties= new BehaviorSubject({fetched:false});
  private url = environment.api_url;

  constructor(private _http: HttpService) {
    this.handleFetch()
    
    this.verified.subscribe( (data)=>{
      if(data.status == "success") this.handleFetch()
    })

   }

   fetchVerificationProperties():Observable<any>{  
    return this._http.GET(`${this.url}/verificationproperties`);  
    }

   getVerificationProperties(){
     return of(this.vProperties)
   }
   verifyProperty(body,id){
     return this._http.PUT(`${this.url}/properties/${id}`,body)

   } 

   handleFetch(){
    this.fetchVerificationProperties().subscribe(
      (data)=>{
        this.vProperties = data;
        this.fetechedVrificationProperties.next({fetched:true})
      },
      (err)=>{
        this.fetechedVrificationProperties.next({fetched:false})
      }
    )
   }

}
