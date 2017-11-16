import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UploadService {

  constructor(
    private http: Http
  ) { }

}
