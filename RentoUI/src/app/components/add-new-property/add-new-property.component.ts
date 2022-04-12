import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PropertyService } from 'src/app/services/property.service';
import { PropertyFormComponent } from '../property-form/property-form.component';

@Component({
  selector: 'app-add-new-property',
  templateUrl: './add-new-property.component.html',
  styleUrls: ['./add-new-property.component.css']
})
export class AddNewPropertyComponent implements OnInit {
  error :boolean = true;
  uploaded:boolean;
  constructor(public dialog: MatDialog,private _ps: PropertyService) { }

  ngOnInit(): void {
    this._ps.fetechedOwnerProperties.subscribe(
      (data)=>{
        if(data.fetched ==  true) this.error = false
        else this.error = true;
      }
    )
    this._ps.propertyUploadSuccess.subscribe((data)=>{
      this.uploaded= data.uploaded;
      if(this.uploaded == true){
        setTimeout(()=>{
          (this._ps.propertyUploadSuccess.next({uploaded:false}));
        },5000)

      }
    })
    
  }

  openDialog(){
    this._ps.handleNewAndEditProperty.next({new:true})
    const dialogRef = this.dialog.open(PropertyFormComponent,{
      width: '650px',disableClose: true ,
      data:{property:null,images:null}
    })
  }
}
