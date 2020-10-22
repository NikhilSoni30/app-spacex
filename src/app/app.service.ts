import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServerService {
  constructor(private http: HttpClient) {}
  // tslint:disable: typedef
  getLandingList() {
    const url = 'https://api.spaceXdata.com/v3/launches?limit=100';
    return this.http.get(url);
  }
  getFilteredList(year?: number, launch?: string, land?: string) {
    debugger;
    let url = 'https://api.spaceXdata.com/v3/launches?limit=100';
    if (year != null) {
      url = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_year=' + year;
    }
    if (launch != null) {
      url += '&launch_success=' + launch;
    }
    if (land != null) {
      url += '&land_success=' + land;
    }
    return this.http.get(url);
  }
}
