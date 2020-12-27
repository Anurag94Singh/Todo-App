import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import{ GlobalConstants } from '../common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  IsRegister = false;
  userRoles = [
    {id:1, name : 'Admin'},
    {id:2, name : 'Teacher'},
    {id:3, name : 'Student'}
  ]

  username;
  password:String;
  role:String;
  email:String;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  OpenRegister(){
    this.IsRegister = true;
    console.log("OpenRegister()!!!!")
  }

  loginApp(){
    const headers = { 'Authorization': 'Bearer my-token'}
    debugger
    this.http.post<any>('http://localhost:8000/api/login/',{"username": this.username,"password": this.password}).subscribe({
            // this.totalAngularPackages = data.total;
            //console.log(JSON.stringify(data))
            next: data => {
              console.log(JSON.stringify(data))
              GlobalConstants.userName = this.username;
              sessionStorage.setItem("userName", this.username);
              sessionStorage.setItem("token", 'Token ' + data.token);
              this.getLoggedUserData()
              // this.router.navigateByUrl('adminuser')
          },
          error: error => {
              // this.errorMessage = error.message;
              console.error('There was an error!', error);
          }
    })
  }

  getLoggedUserData(){
    let params = new HttpParams().set('username',GlobalConstants.userName)
    this.http.get<any>('http://localhost:8000/GetUsersByName/',{params:params}).subscribe({
            next: data => {
              console.log(JSON.stringify(data))
              GlobalConstants.userRole = data[0]['role']
              GlobalConstants.userId = data[0]['id']
              sessionStorage.setItem("userId", data[0]['id']);
              sessionStorage.setItem("userRole", data[0]['role']);
              if(GlobalConstants.userRole == "Teacher"){
                this.router.navigateByUrl('adminuser')
              }
              else{
                this.router.navigateByUrl('student')
              }
              
          },
          error: error => {
              // this.errorMessage = error.message;
              console.error('There was an error!', error);
          }
    })
  }

  Register(){
    const headers = { 'Authorization': 'Bearer my-token'}
    debugger
    let param = {
      "username": this.username,
      "email": this.email,
      "password": this.password
  }
    this.http.post<any>('http://localhost:8000/api/register/',param).subscribe({
            // this.totalAngularPackages = data.total;
            //console.log(JSON.stringify(data))
            next: data => {
              console.log(JSON.stringify(data))
              GlobalConstants.userName = this.username;
              sessionStorage.setItem("userName", this.username);
              this.UpdateUser()
          },
          error: error => {
              // this.errorMessage = error.message;
              console.error('There was an error!', error);
          }
    })
  }

  UpdateUser(){
    const headers = { 'Authorization': 'Bearer my-token'}
    debugger
    let param = {
      "username": this.username,
      "role": this.role
  }
    this.http.post<any>('http://localhost:8000/UpdateUserData/',param).subscribe({
            // this.totalAngularPackages = data.total;
            //console.log(JSON.stringify(data))
            next: data => {
              console.log(JSON.stringify(data))
              if(data.status == "ok"){
                GlobalConstants.userName = this.username;
                this.getLoggedUserData()
              }
              
          },
          error: error => {
              // this.errorMessage = error.message;
              console.error('There was an error!', error);
          }
    })
  }


  

}
