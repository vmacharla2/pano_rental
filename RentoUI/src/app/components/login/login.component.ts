import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PropertyService } from 'src/app/services/property.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData = {'email':"",'password':""};
  loginForm :FormGroup;
  hide= true;
  errormsg="";

  constructor(private _us: UserService,
              private _ps: PropertyService,
              private router :Router,
              public dialog: MatDialog,
              public snackBar: MatSnackBar
               
               ) { }

  ngOnInit(): void {
    this._us.loginCheck.subscribe();
    this.loginForm = new FormGroup(
      {
        email : new FormControl('',[Validators.required,Validators.email]),
        password :new FormControl('',[Validators.required,Validators.minLength(8)])
      }
    );
  }  
  onLogin(){
    if (this.loginForm.invalid) {
      // this.snackBar.open('Please Fill fields','',{duration: 2000});       
      return;
    }  
    this.formData.email =this.loginForm.value.email;
    this.formData.password  = this.loginForm.value.password;
    this._us.authenticate(this.formData).subscribe(
      (res)=>{
        if(res["role"]=="admin")  {
          this.router.navigate(['/admin']);  
          localStorage.setItem('role', "admin");
          this.errormsg = null;
          this._us.loginCheck.next({loggedIn:true})
        }
        else{
        localStorage.setItem('id', res['id']);
        localStorage.setItem('token', res['token']);
        localStorage.setItem('username', res['username']);
        localStorage.setItem('role', "user")
        this._ps.fetchOwnerproperties(res['id'])
        this._ps.fetchPropertyContactRequests(res['id']);
        this._ps.fetchTenantsList(res['id']);
        this.errormsg = null;
        this._us.loginCheck.next({loggedIn:true})
        this.router.navigate(['/dashboard',res['id']]);
        }
      },
      (err)=>{
        if(err.status == 0){
          this.errormsg = "Server Unavailable";
        }
  
        else this.errormsg= err.statusText;     
       
      }
    )   
  }
  closeDialog(): void {
      this.dialog.closeAll();
  }
}
