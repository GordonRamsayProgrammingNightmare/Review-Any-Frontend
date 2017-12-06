import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CrudDataService {
  private BASE_URL: string = 'http://localhost:3000/api';

  constructor(
    private http: Http
  ) { }

  getData(token, type): Promise<any> {
    let url: string = `${this.BASE_URL}/${type}`;
    // console.log('post url: ', url);
    let headers: Headers = new Headers({
	    'Content-Type': 'application/json',
	    'x-access-token': `${token}`
	  });
	  return this.http.get(url, {headers: headers}).toPromise();
  }

  sendData(token, type, data): Promise<any> {
    // console.log(`${token}`);
    let url: string = `${this.BASE_URL}/${type}/${data}`;
    let headers: Headers = new Headers({
	    'Content-Type': 'application/json',
	    'x-access-token': `${token}`
    });
    // console.log(headers);
    const body = {};
    return this.http.post(url, body, {headers: headers}).toPromise();
  }

  uploadData(token, type, data): Promise<any> {
    let url: string = `${this.BASE_URL}/${type}`;
    return this.http.post(url, data, {
      headers: new Headers({ 'Content-Type': 'application/json', 'x-access-token': `${token}` })
    }).toPromise();
  }

  deleteData(token, type, id): Promise<any> {
    let url: string = `${this.BASE_URL}/${type}/${id}`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`
    });
    return this.http.delete(url, {headers: headers}).toPromise();
  }

  deleteData2(token, type, id1, id2, param): Promise<any> {
    let url: string = `${this.BASE_URL}/${type}/${id1}/${id2}/${param}`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`
    });
    return this.http.delete(url, {headers: headers}).toPromise();
  }

  putData(token, type, id): Promise<any> {
    let url: string = `${this.BASE_URL}/${type}/${id}`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`
    });
    return this.http.put(url, {headers: headers}).toPromise();
  }

}
