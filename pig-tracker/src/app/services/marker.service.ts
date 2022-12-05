import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { ApiServiceService as Api }  from 'src/app/services/api-service.service';



@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  mapMarkers : any = [];
  pigCounts : any = {};

  constructor(private api : Api) { }

  
  removeLocation(map:any, key:any): void {

    this.api.getSpecificPig(key.key).subscribe({
      next:(response)=>{
        console.log(response)
        var lat = response.data.lat
        var long = response.data.long

        var marker = L.marker([lat,long])

        map.removeLayer(marker)
      },
      error:(error)=>{
        alert("failed getting pig")
      }
    })
  }

  markLocation(map:any): void {

    this.api.getPig().subscribe({
      next:(response)=>{

        for (var d of response){
          let latLongStr = String(d.data.lat)+String(d.data.long)
          if(latLongStr in this.pigCounts){
            this.pigCounts[latLongStr]++;
          } else{
            this.pigCounts[latLongStr] = 1;
          }
        }

        for(var m of this.mapMarkers){
          map.removeLayer(m)
        }

        

        for (var d of response){
          let latLongStr = String(d.data.lat)+String(d.data.long)

          var marker = L.marker([d.data.lat, d.data.long])
          this.mapMarkers.push(marker)
          marker.bindPopup(d.data.location);
          
          marker.bindPopup(
            `` +
          `<div><b>${ d.data.location }</b></div>` +
          `<div>${ this.pigCounts[latLongStr] } Pigs reported</div>`);

          marker.addTo(map)

        }
        this.pigCounts = {}
      },
      error:(error)=>{
        alert("Error while getting pig");
      }
    })   
  }
}
