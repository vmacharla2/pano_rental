import { Component, OnInit,Input } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	locations=[];
    searchPlaceHolder = "Search by Location";
	typePlaceHolder = "Property Type";
	propertyTypes= ["Villa","House","Flat"];
	maxBudgetPlaceHolder = "Max Budget";
	minBudgetPlaceHolder = "Min Budget";
	error =null;

  constructor(private _ps: PropertyService) { }
  ngOnInit(): void {
    this._ps.propertySearchFilters.subscribe();
	this._ps.fetechedProperties.subscribe(
		(data)=>{
		  if(data.fetched==true){
			this.locations = this._ps.getLocations();	
			  this.error=null;
			}		  
		})
	}
	params={};
	searchLocation ="";
	propertyType="";
	minrent="";
	maxrent="";
	sort="no"
	checkPlaceHolder() {
		if (this.searchLocation!="") {
		    this.searchPlaceHolder = null;	
		return;
		} else {
			this.searchPlaceHolder ='Search by Location';
		return
		}
	}
	pTypePlaceHolder() {
		if (this.propertyType!= "") {
		this.typePlaceHolder = null;
		return;
		} else {
		this.typePlaceHolder = 'Property Type'
		return
		}
	}
	pminBudgetPlaceHolder() {
		if (this.minrent == "") {
		this.minBudgetPlaceHolder = 'Min Budget';
		return;
		} else {
			this.minBudgetPlaceHolder = null;
		return
		}
	}
	pmaxBudgetPlaceHolder() {
		if (this.maxrent == "") {
		    this.maxBudgetPlaceHolder = 'Max Budget';
		    return;
		} else {
			this.maxBudgetPlaceHolder = null;
			return
		}
	}

	handleSearch(){
		this.pTypePlaceHolder();
		this.pmaxBudgetPlaceHolder();
		this.pminBudgetPlaceHolder();
		this.checkPlaceHolder();
		this.params ={};
		if(this.searchLocation!=""){
			this.params["location"]= this.searchLocation;
		}
		if(this.propertyType!=""){
			this.params["type"] = this.propertyType;
		}
		if(this.minrent!=""){
			this.params["minrent"] = +this.minrent;
		}
		if(this.maxrent!=""){
			this.params["maxrent"] = +this.maxrent;
		}
		if(this.sort!="no"){
			this.params["sort"] = this.sort;
		}
		this._ps.searchFilters=this.params;
		if(this._ps.searchFilters){
			// this.getProperties(this.params);
           this._ps.propertySearchFilters.next(this._ps.searchFilters);
		}
		else this._ps.propertySearchFilters.next({});		
	}
	clearFilters(){
		this.searchLocation ="";
		this.propertyType="";
		this.minrent="";
		this.maxrent="";
		this.sort="no"
		this.pTypePlaceHolder();
		this.pmaxBudgetPlaceHolder();
		this.pminBudgetPlaceHolder();
		this.checkPlaceHolder();
		this._ps.propertySearchFilters.next({});

	}
	

}
