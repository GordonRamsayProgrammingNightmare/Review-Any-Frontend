import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetDataService {
  private BASE_URL: string = 'http://localhost:3000/api';

  constructor(
    private http: Http
  ) { }

  getData(token, type): Promise<any> {
    let url: string = `${this.BASE_URL}/${type}`;
    console.log('post url: ', url);
    let headers: Headers = new Headers({
	    'Content-Type': 'application/json',
	    'x-access-token': `${token}`
	  });
	  return this.http.get(url, {headers: headers}).toPromise();
  }
}
