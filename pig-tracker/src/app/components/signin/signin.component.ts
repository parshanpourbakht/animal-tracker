import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ApiServiceService as Api} from 'src/app/services/api-service.service';
import { HashServiceService } from 'src/app/services/hash-service.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public key: any, private api:Api, private hash:HashServiceService, private http:HttpClient) { }

  hashedPassword = "84892b91ef3bf9d216bbc6e88d74a77c";
  hide = true;
  tempPassword = "";    

  ngOnInit(): void {
  }

  checkValidPassword(password:string){

    this.http.get<Object>('https://api.hashify.net/hash/md5/hex?value='+password).subscribe((data:any)=>{
      if(data.Digest == '84892b91ef3bf9d216bbc6e88d74a77c'){
        console.log("TRUE")
        this.changeStatus()
      }else{
        console.log("damn")
      }
    })

    

  
  }

  changeStatus(){
    console.log("gogog", this.key)
    this.api.getSpecificPig(this.key.dataKey).subscribe({
      next:(response)=>{
        response.data.status = !response.data.status
        this.api.approvePig(this.key.dataKey, response).subscribe({
          next:(res)=>{

          },
          error:(error)=>(
            alert("adsf")
          )
        })
      },
      error:(error)=>{
        alert("Error while getting pig");
      }
    })
  }

}


