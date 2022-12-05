import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ApiServiceService as Api} from 'src/app/services/api-service.service';
import { HashServiceService } from 'src/app/services/hash-service.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

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
        this.deletePig()
      }else{
        console.log("damn")
      }
    })
  }


  deletePig(){
    this.api.deletePig(this.key.dataKey).subscribe({
      next:(response)=>{
        alert("success");
      },
      error:(error)=>{
        alert("Error while getting pig");
      }
    })
  }



}
