import { HttpClient } from '@angular/common/http';
import { Component, OnInit,OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import{MatSort} from '@angular/material/sort';
import { environment } from 'src/environments/environment';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 
  private url = environment.api_url;
  vProperties:any;
  dataSource = new MatTableDataSource([]); 
  // displayedColumns = ['id', 'documentproof','location'];
  displayedColumns = ['id', 'location', 'rent', 'state'];
  error:boolean = null;
  clicked:boolean= false;
  constructor(private _http: HttpClient,
    private _ps: PropertyService,
    private _as: AdminService,
    private router:Router,
    private changeDetectorRef: ChangeDetectorRef) {
      this._as.fetechedVrificationProperties.subscribe(
        (data)=>{
          if(data.fetched == true) {
            this._as.getVerificationProperties().subscribe(
              (properties)=>{
                this.vProperties = properties;
                this.dataSource = new MatTableDataSource(this.vProperties);
                this.dataSource.paginator = this.paginator;
              }
            )
            this.error = false;
          }
          else this.error = true;
        },
      )
     }
  ngOnInit(): void {
      this._ps.selectedProperty.subscribe();    
      this.changeDetectorRef.detectChanges();    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  showPendingProp(){
    this.dataSource = new MatTableDataSource(this.vProperties);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.clicked = true;
  }
  propertyDetails(prop){
    prop["ownerPropClick"] = true;
    this._ps.selectedProperty.next(prop);
    this.router.navigate(["/propertydetails",prop.id])
  }

}
