import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EndpointProvider {

  constructor(public http: HttpClient) {
  }

}
