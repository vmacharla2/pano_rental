import { Pipe, PipeTransform } from '@angular/core';
import{Property} from 'src/app/model/property';

@Pipe({
  name: 'filterLocation'
})
export class FilterLocationPipe implements PipeTransform {

  transform(properties: Property[], searchLocation:string): Property[] {
    console.log("called")
    if(properties.length>0){
      if(searchLocation==""){
        console.log("no search");
          return properties.filter(
            v => v["location"] == searchLocation
          );
        
  
        return properties
      }
      console.log("location:" + searchLocation)
      return properties;
    }

  }

}
