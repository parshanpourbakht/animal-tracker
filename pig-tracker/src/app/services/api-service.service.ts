import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http : HttpClient, public datepipe : DatePipe ) { }


  postPig(data: any){

    
    const currentDateTime = this.datepipe.transform((new Date), 'MMddyyyyhmmss');
     console.log(currentDateTime)

    var obj: any = 
    {
      "key": currentDateTime,
      "data": data
    };

    return this.http.post<any>("https://272.selfip.net/apps/i4eutQ4nfi/collections/pig-tracker/documents/", obj);
  }

  deletePig(key : any){
    return this.http.delete<any>("https://272.selfip.net/apps/i4eutQ4nfi/collections/pig-tracker/documents/"+key);
  }

  getPig(){
    return this.http.get<any>("https://272.selfip.net/apps/i4eutQ4nfi/collections/pig-tracker/documents/");
  }

}
