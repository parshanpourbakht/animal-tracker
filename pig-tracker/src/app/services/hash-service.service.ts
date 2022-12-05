import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HashServiceService {

  constructor(private http:HttpClient) { }

  getHash(value:string){
    return this.http.get("https://api.hashify.net/hash/md5/hex?value=" + value)

  }
}
