import { Component, OnInit,ViewChild, ChangeDetectorRef } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import{MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-tenants-list',
  templateUrl: './tenants-list.component.html',
  styleUrls: ['./tenants-list.component.css']
})
export class TenantsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 
  dataSource = new MatTableDataSource([]); 
  displayedColumns = ['name', 'mobile', 'email','property_id'];

  verifiedPropIds=[];
  vacantPropeIds=[];
  clicked:boolean = false;
  error :boolean = null;
  errormsg ="";
  tenantsList = [];
  propertyTenantDetails={};
  constructor(private _ps:PropertyService) { 
    this._ps.fetchedTenantsList.subscribe(
      (data)=>{
        if(data.fetched==true){
          this.vacantPropeIds = this._ps.vacantPropIds;
          this.verifiedPropIds= this._ps.verifiedPropIds;
          this.tenantsList = _ps.tenantsList;
          if(this.tenantsList.length == 0){
            this.errormsg = "No Tenants added to your property";
          }
          else{
          console.log(this.tenantsList)
          this.dataSource = new MatTableDataSource(this.tenantsList);
          this.dataSource.paginator = this.paginator;
          this.error= false;
          this.clicked = true;
        
        }
 
        }
        else 
        this.error= true;
        this.errormsg="Error while Fetching tenenant list";
      })
     
    }
         

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
