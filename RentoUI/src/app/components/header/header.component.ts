import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  signedIn:boolean= false;
  id:string=null;
  username:string= null;
  role:string= null;
  
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private router:Router,private _ps: PropertyService,private _us: UserService) { }

  ngOnInit(): void {
    this._ps.propertySearchFilters.subscribe();
    // this.id = localStorage.getItem('id');
    // if(this.id){
    //   this.signedIn=true;
    // }
    this._us.loginCheck.subscribe(
      (data)=>{
        if(data.loggedIn==false) this.signedIn= false;
        else {
          this.signedIn = true;
          this.role = localStorage.getItem('role');

          this.id = localStorage.getItem('id');
          this.username = localStorage.getItem('username')
        }
      }
    )
    this._ps.showOwnerProperties.subscribe()
  }
  logout(){
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    localStorage.removeItem('username')
      this.router.navigate(['/login']);
      this.signedIn=false;
  }
  
  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
  handleHome(){
    this._ps.propertySearchFilters.next({});
    this._ps.ownerPropClick.next({ownerProp:false})

  }
  handleAddNew(){
    this._ps.showOwnerProperties.next({show:true})
    this._ps.ownerPropClick.next({ownerProp:true})
  }

}
