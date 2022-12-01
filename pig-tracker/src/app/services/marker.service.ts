import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { ApiServiceService as Api }  from 'src/app/services/api-service.service';



@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private api : Api) { }

  markLocation(map:any): void {

    this.api.getPig().subscribe({
      next:(response)=>{
        for (var d of response){

          var marker = L.marker([d.data.lat, d.data.long])
          
          marker.bindPopup(d.data.location);
          
          marker.bindPopup(
            `` +
          `<div><b>${ d.data.location }</b></div>` +
          `<div>${ d.data.name } Pigs reported</div>`);

          marker.addTo(map)

        }

        

      },
      error:(error)=>{
        alert("Error while getting pig");
      }
    })   }
}
