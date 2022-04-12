import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import{passwordChecker} from './../../custom-validators/password-checker'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {


  registerForm:FormGroup;
  submitted = false;
  hide= true;
  constructor(private formbuilder:FormBuilder,
    private _us : UserService, 
    private snackbar:MatSnackBar,
    private _router :Router
    ){

  }
  ngOnInit(){
    this.registerForm = this.formbuilder.group(
      {
        username: ['',[Validators.required,Validators.minLength(3)]],
        mobile: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],   
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]],
        confirmPassword :['',Validators.required],
      },{
        Validators:passwordChecker('password','confirmPassword')
      }
      );
  }
  get registrationPassword() {
    return this.registerForm.get('password');
  }
  get registrationcPassword() {
    return this.registerForm.get('confirmPassword');
  }
 
  
    onReset(){
      this.submitted= false;
      this.registerForm.reset();
      
    }
    onSubmit(){
      if(this.registerForm.valid){
        this.submitted = true;
        let userDetails = new FormData()
        Object.keys(this.registerForm.controls).forEach(key=>{
          if(key!=="confirmPassword")
          userDetails.append(key,this.registerForm.get(key).value)
        })
        this._us.register(userDetails).subscribe(
          (res)=>{
            let sb=  this.snackbar.open("Registration Successfull","close",{
              duration : 3000,
              panelClass: ['snackbar-style']
              });
              sb.onAction().subscribe(()=>{
                this._router.navigate(['/login'])
                sb.dismiss();
        
              })
              sb.afterDismissed().subscribe(()=>{
                this._router.navigate(['/login'])
              })

          },
          (err)=>{
            let sb=  this.snackbar.open(err.error,"close",{
              duration : 3000,
              panelClass: ['snackbar-style']
              });
            return

          }
        )
      }
      else return
    
    }
  get h(){
    return this.registerForm.controls;
  }
}


