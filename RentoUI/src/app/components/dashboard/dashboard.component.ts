import { Component, OnInit,OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import{MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 
  id :string;
  clicked:boolean= false
  error: boolean = false;
  properties:[];
  viewing:string= "";
  pendingProperties :any;
  verifiedProperties:any;
  rentedProperties :any;
  vacantProperties :any;
  dataSource = new MatTableDataSource([]); 
  displayedColumns = ['id', 'location', 'rent', 'state'];
  constructor(private _ps: PropertyService,private route :ActivatedRoute,private router:Router,private changeDetectorRef: ChangeDetectorRef) { 
    this._ps.fetechedOwnerProperties.subscribe(
      (data)=>{
        if(data.fetched==true){
          this._ps.getOwnerProperties().subscribe((properties)=>{
            this.properties= properties;
            this.dataSource = new MatTableDataSource(this.rentedProperties);
            this.dataSource.paginator = this.paginator;
            this.pendingProperties = this.properties.filter(p => p["verified"]=="no");
            this.verifiedProperties =  this.properties.filter(p => p["verified"]=="yes");
            this.rentedProperties =  this.properties.filter(p => p["status"]=="rented");
            this.vacantProperties =  this.properties.filter(p => p["status"]=="vacant");
            this.vacantProperties.forEach(property => {
            this._ps.vacantPropIds.push(property.id)              
            });
            this.verifiedProperties.forEach(property => {
              this._ps.verifiedPropIds.push(property.id)              
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
    this._ps.selectedProperty.subscribe();
    this._ps.ownerPropClick.subscribe()
    this.changeDetectorRef.detectChanges(); 
    this.id = this.route.snapshot.paramMap.get('id');
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
  showPendingProp(){
    this.dataSource = new MatTableDataSource(this.pendingProperties);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.clicked = true;
    this.viewing = "Pending Properties";
  }
  showVerifiedProp(){
    this.dataSource = new MatTableDataSource(this.verifiedProperties);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.clicked = true;
    this.viewing = "Verified Properties";
  }
  showRentedProp(){
    this.dataSource = new MatTableDataSource(this.rentedProperties);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.clicked = true;
    this.viewing = "Rented Properties";
  }
  showVacantProp(){
    this.dataSource = new MatTableDataSource(this.vacantProperties);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.viewing = "Vacant Properties";
    this.clicked = true;
  }

  propertyDetails(prop){
    prop["ownerPropClick"] = true;
    this._ps.ownerPropClick.next({ownerProp:true})
    this._ps.selectedProperty.next(prop);
    this.router.navigate(["/propertydetails",prop.id])
  }

}
