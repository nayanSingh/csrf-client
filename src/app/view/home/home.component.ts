import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../services/article.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data:any;
  message:string;
  constructor(private dataService:ArticleService,private cookieService:CookieService,private router:Router ) { 

    this.dataService.getCall().subscribe(sucResp  => {
      console.log(sucResp );
     this.data=sucResp ;
     console.log(this.data);
     var csrfToken = sucResp.headers.get('X-CSRF-TOKEN')
     if (csrfToken) {
       var cookie = JSON.parse(this.cookieService.get('helloween'));
       cookie.csrf = csrfToken;
       this.cookieService.set( 'helloween', JSON.stringify(cookie) );
     }
    //this.message=sucResp.message;
    }, (error) => {
     console.log(error);
     if (error.status === 401) { // HTTP Status 401: Unauthorized
      console.log(error.headers.get('X-CSRF-TOKEN'));
      var cookie = JSON.stringify({method: 'GET', url: '/login', csrf: error.headers.get('X-CSRF-TOKEN')});
     // $.cookie('helloween', cookie);
     this.cookieService.set( 'helloween', cookie );
     // window.location = '/login.html';
     this.router.navigate(["login"]);

  }
});
  }
  

 

 
  ngOnInit() {
  }

}
