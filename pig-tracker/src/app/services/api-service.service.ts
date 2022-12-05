import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http : HttpClient, public datepipe : DatePipe ) { }

  path = "https://272.selfip.net/apps/i4eutQ4nfi/collections/KjglcGjGdcmiOLB3v1QUjRSGXtnBtN/documents/"
  postPig(data: any){

    
    const currentDateTime = this.datepipe.transform((new Date), 'MMddyyyyhmmss');

    var obj: any = 
    {
      "key": currentDateTime,
      "data": data
    };

    return this.http.post<any>(this.path, obj);
  }

  deletePig(key : any){
    return this.http.delete<any>(this.path+key);
  }

  approvePig(key :any, data:any){
    return this.http.put(this.path+key, data)

  }

  getSpecificPig(key : any) {
    return this.http.get<any>(this.path+key);
  }

  getPig(){
    return this.http.get<any>(this.path);
  }

}
