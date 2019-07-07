import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {ArticleService} from '../../services/article.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private httpClient:HttpClient,private cookieService:CookieService,private dataService:ArticleService,private router:Router ) { }

  ngOnInit() {
 
     
  }
  data:any
  password:string;
  username:string;
  login(){
    console.log("login method called");
    this.cookie = JSON.parse(this.cookieService.get('helloween'));
    console.log(this.cookie.csrf);
   this.dataService.login({username:'user',password:'user'},{
    headers: { 'X-CSRF-TOKEN':this.cookie.csrf }}).subscribe(data =>{ 
      this.data=data;
      console.log(this.data);
      this.router.navigate(["home"]);
      },(error)=>{
        console.log('Booh! Wrong credentials, try again!');
      });
    
  }
  cookie:any='Unknown'
  login1(data: any) {
    this.cookie = JSON.parse(this.cookieService.get('helloween'));
    console.log(this.cookie);
    console.log(this.cookie.csrf);
    return this.httpClient.post('/login', data,{
      headers: { 'X-CSRF-TOKEN':this.cookie.csrf }});
  }

}
