import { ChangeDetectorRef, Component, OnInit,ViewChild } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import{MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-property-contact-requests',
  templateUrl: './property-contact-requests.component.html',
  styleUrls: ['./property-contact-requests.component.css']
})
export class PropertyContactRequestsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  contactRequests :[];
  ds = new MatTableDataSource([]);
  clicked :boolean = false;
  columns = ['property_id', 'name','mobile', 'mail','visitdate' ]; 
  constructor(private _ps: PropertyService,private changeDetectorRef: ChangeDetectorRef) { 
    
  }
  ngOnInit(): void {
    this._ps.fetechedPropertyRequests.subscribe(
      (data)=>{
        if(data.fetched == true){
          this._ps.getPropertContactRequest().subscribe(
            (requests)=>{
              this.contactRequests = requests;
              this.ds = new MatTableDataSource(this.contactRequests);
              this.ds.paginator = this.paginator;
              this.ds.sort = this.sort;
              this.clicked = true;
            }
          )
        }
      }
    )    
    this.changeDetectorRef.detectChanges(); 
    
  }
  ngAfterViewInit() {
    this.ds.paginator = this.paginator;
    this.ds.sort = this.sort;
  }
  mailto(toAddress: string, mailSubject: any) {
    return "mailto:" + toAddress + "?subject=" + mailSubject
}

}
