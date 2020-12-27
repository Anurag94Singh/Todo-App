import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from '../common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName = sessionStorage.getItem('userName');
  token = sessionStorage.getItem('token');

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('userName');
    this.token = sessionStorage.getItem('token');
  }

  logout(){
    // const headers = new HttpHeaders({ 'Authorization': sessionStorage.getItem("token")});
    let headers = new HttpHeaders().set('Authorization', sessionStorage.getItem("token")); 
    //let headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
    // this.http.post<any>('http://localhost:8000/api/logout/',{headers:headers}).subscribe(data => {
    //   sessionStorage.clear()
    //   console.log('logout !!!')
    // })
    sessionStorage.clear()
    this.router.navigateByUrl('')
    this.token = '';
  }

}
