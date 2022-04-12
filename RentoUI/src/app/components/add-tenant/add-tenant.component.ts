import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropertyService } from 'src/app/services/property.service';
Validators

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.css']
})
export class AddTenantComponent implements OnInit {
  tenantForm :FormGroup;
  properties = [];
  error:boolean =null;
  availableProperties =[];
  pIds =[];
  owner_id = localStorage.getItem('id');


  constructor(private _fb:FormBuilder,private _ps:PropertyService, private snackbar:MatSnackBar) {
    this._ps.fetechedOwnerProperties.subscribe(
      (data)=>{
        if(data.fetched==true){
          this._ps.getOwnerProperties().subscribe((properties)=>{
            this.properties= properties;
            this.availableProperties =  this.properties.filter(p => p["verified"]=="yes" &&  p["status"]=="vacant");
            this.availableProperties.forEach(property => {
            this.pIds.push(property.id)              
            });
            this.error= null;         
          })
        }
      }
    )
    this._ps.ownerPropertiesGetError.subscribe(
      (data)=>{
        if(data.error== true){
          this.error= true;
        }
      }
    )
    
   }

  ngOnInit(): void {
    this.tenantForm  = this._fb.group({
      property_id: ['', [Validators.required]],
      name: ['', [Validators.required,Validators.pattern('[a-zA-Z]{3,15}')]],
      mobile: ['' ,[Validators.required,Validators.pattern('[6-9][0-9]{9}')] ],
      email: ['',[Validators.email,Validators.required]],
    }); 
  }

  handleSubmit(){
    if(this.tenantForm.valid){
      let tenantDetails = new FormData();
      Object.keys(this.tenantForm.controls).forEach(key => {
        tenantDetails.append(key,this.tenantForm.get(key).value) 
      });
      tenantDetails.append("owner_id",this.owner_id);
      this._ps.addTenant(tenantDetails).subscribe(
        (res)=>{
          this.error = false;
          let sb=  this.snackbar.open("Tenant Added Successfully","close",{
            duration : 4000,
            panelClass: ['snackbar-style']
            });
            sb.onAction().subscribe(()=>{
              this.tenantForm.reset();
              sb.dismiss();
      
            })
            sb.afterDismissed().subscribe(()=>{
              this.tenantForm.reset();
              
            })

        },
        (err)=>{
          this.error = true;

        }
      )
    }
    else return
    
  }
  reset(){
    this.tenantForm.reset()
  }

}
