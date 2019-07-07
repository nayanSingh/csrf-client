import {HttpClient,HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  getArticle(): Observable<string> {
    return this.http.get('/', {responseType: 'text'});
  }

  public login(data: any,header:any) {
   // return this.http.post('/login', data);
     return this.http.post<HttpResponse<Object>>("/api/login",data,header);
  }
  getCall() {
    // return this.http.get("/rest/hello", {
    //   headers: { 'Authorization':
    //    ' Bearer ' }});

       return this.http.get<HttpResponse<Object>>("/api/rest/hello", {observe: 'response'});
  
  }
}
