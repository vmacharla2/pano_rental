import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef} from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import{Property} from 'src/app/model/property';
import { Observable } from 'rxjs';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit,OnDestroy  {
  properties:Property[];
	error=false;
  searchFilters={};
  filteredEmpty= false;
  propertiesSelected:Property[]=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource = new MatTableDataSource([]);   
  constructor(private _ps: PropertyService, private changeDetectorRef: ChangeDetectorRef) {
    _ps.showOwnerProperties.subscribe(
      (data)=>{
        if(data.show == true) {
          this._ps.fetechedOwnerProperties.subscribe(
            (data)=>{
              if(data.fetched==true){
                this._ps.getOwnerProperties().subscribe((properties)=>{
                  this.properties = properties;
                  this.propertiesSelected= properties;
                  this.dataSource = new MatTableDataSource(this.propertiesSelected);
                  this.dataSource.paginator = this.paginator;
                  this.obs = this.dataSource.connect();
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
        else{
          this._ps.fetechedProperties.subscribe(
            (data)=>{
              if(data.fetched==true){
                this._ps.getAllProperties().subscribe((properties)=>{
                  this.properties= properties;
                  this.propertiesSelected=properties;
                  this.dataSource = new MatTableDataSource(this.propertiesSelected);
                  this.dataSource.paginator = this.paginator;
                  this.obs = this.dataSource.connect();
                  this.error=null;
                })
              }
            }
          )
          this._ps.propertiesGetError.subscribe(
            (data)=>{
              if(data.error== true){
                this.error= true;
              }
            }
          )    

        }
     }
    )
    
  }
  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();  
    this._ps.propertySearchFilters.subscribe(
      (data)=>this.applyFilters(data));
  }
  applyFilters(data){
    this.searchFilters= data;
    this.propertiesSelected= this.properties;
    if("location" in this.searchFilters){           
       this.propertiesSelected = this.propertiesSelected.filter(
       p => p["location"]===this.searchFilters["location"])
    }
    if("type" in this.searchFilters){           
      this.propertiesSelected = this.propertiesSelected.filter(
        p => p["type"]===this.searchFilters["type"])
      }

    if("minrent" in this.searchFilters){           
      this.propertiesSelected = this.propertiesSelected.filter(
        p => p["rent"]>=+this.searchFilters["minrent"])
    }
    if("maxrent" in this.searchFilters){           
      this.propertiesSelected = this.propertiesSelected.filter(
        p => p["rent"]<=+this.searchFilters["maxrent"])
    }
    if("sort" in this.searchFilters){      
      if(this.searchFilters["sort"]=="asc"){
        // return parseFloat(a.price) - parseFloat(b.price);
        this.propertiesSelected=this.propertiesSelected.sort((a,b) => a.rent - b.rent);        
      }
      else if(this.searchFilters["sort"]=="des"){
        this.propertiesSelected=this.propertiesSelected.sort((a,b) => b.rent - a.rent);  
            }
    }
    this.dataSource = new MatTableDataSource(this.propertiesSelected);
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    if(this.propertiesSelected?.length==0)
      this.filteredEmpty=true;      
    else
    this.filteredEmpty=false
    
  }
  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
}
