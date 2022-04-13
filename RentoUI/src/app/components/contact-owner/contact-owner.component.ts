import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from 'src/app/services/property.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-contact-owner',
  templateUrl: './contact-owner.component.html',
  styleUrls: ['./contact-owner.component.css']
})
export class ContactOwnerComponent implements OnInit {
  p_id= null;
  req_submitted= false;

  constructor(
              private dateAdapter: DateAdapter<any>,
              private _fb: FormBuilder,
              private _ps:PropertyService,
              private snackbar:MatSnackBar,
              private  dialogref: MatDialogRef<ContactOwnerComponent>,
              @Inject(MAT_DIALOG_DATA) private data :any
              
              ) {
                this.p_id = data.property_id; 
    this.dateAdapter.setLocale('en-US');
  }
   contactForm:FormGroup;
  ngOnInit(): void {
    this.contactForm  = this._fb.group({
      requester_name: ['', [Validators.required,Validators.pattern('[a-zA-Z]{3,15}')]],
      requester_mail: ['', [Validators.required,Validators.email]],
      requester_mobile: ['' ,[Validators.required,Validators.pattern('[6-9][0-9]{9}')]],
      visit_request_date: ['',],
    });  
  }
  closeDialog(): void {
    this.dialogref.close()
   
  }
  handleContactInfo(){
    if(this.contactForm.valid){
      let contactDtetails;
      contactDtetails = this.contactForm.value;
      contactDtetails['property_id']= this.p_id;
      this._ps.addUserContactInfo(contactDtetails).subscribe(
        (res)=>{
     
          setTimeout(() => {this.dialogref.close()
              
          }, 4000);
          this.contactForm.reset();
          let sb=  this.snackbar.open("Your Details Posted Successfully","close",{
          duration : 4000,
          panelClass: ['snackbar-style']
          });
          sb.onAction().subscribe(()=>{
            this.dialogref.close();
            sb.dismiss();

          })
          sb.afterDismissed().subscribe(()=>{
            this.dialogref.close()
          })
    
        },
        (err) =>{
          let sb=  this.snackbar.open("Error while Posting Details","close",{
            duration : 4000,
            panelClass: ['snackbar-style']
            });
            sb.onAction().subscribe(()=>{
              this.dialogref.close();
              sb.dismiss();
  
            })
            sb.afterDismissed().subscribe(()=>{
              this.dialogref.close()
            })
      
        }
      )
    }
    else return
    
    
  }  

}
