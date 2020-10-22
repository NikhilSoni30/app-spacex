import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServerService } from './app.service';
import { LaunchDetails } from './app.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'spacex-app';
  subscription: Subscription;
  launchData: LaunchDetails[] = [];
  buttonValMap: Map<number, boolean> = new Map();
  buttonVal = [];
  yearSelected: number;
  launchSuccess: any;
  landingSuccess: any;
  constructor(private service: ServerService) {}

  // tslint:disable: typedef
  ngOnInit() {
    this.loadLandingList();
    for (let i = 2006; i <= 2020; i++) {
      this.buttonVal.push(i);
      this.buttonValMap.set(i, false);
    }
  }
  loadLandingList() {
    this.subscription = this.service.getLandingList().subscribe((response: any[]) => {
      this.setLaunchDisplayData(response);
      },
      (error) => {
        throw error;
      }
    );
  }
  setLaunchDisplayData(response) {
    this.launchData = [];
    for (let i = 0; i < response.length; i++) {
      const launchObj = new LaunchDetails();
      launchObj.flightNumber = response[i].flight_number;
      launchObj.landSuccess = response[i].launch_landing;
      launchObj.launchSuccess = response[i].launch_success;
      launchObj.launchYear = response[i].launch_year;
      launchObj.missionIds = response[i].mission_id;
      launchObj.missionName = response[i].mission_name;
      launchObj.imgSrc = response[i].links.mission_patch_small;
      this.launchData.push(launchObj);
    }
  }
  buttonClicked(event) {
    const year = Number(event.target.value);
    if (this.buttonValMap.get(year) === true) {
      this.buttonValMap.set(year, false);
      this.yearSelected = null;
    } else {
      for (let key of this.buttonValMap.keys()) {
        this.buttonValMap.set(key, false);
      }
      this.yearSelected = year;
      this.buttonValMap.set(year, true);
    }
    this.getFilteredLaunchList();
  }

  getFilteredLaunchList() {
    this.subscription = this.service.getFilteredList(this.yearSelected, this.launchSuccess, this.landingSuccess).subscribe(response => {
      this.setLaunchDisplayData(response);
    }, error => {
      throw error;
    });
  }
  launchSuccessButton(action) {
    if (action === true) {
      if (this.launchSuccess === true) {
        this.launchSuccess = null;
      } else {
        this.launchSuccess = true;
      }

    } else if (action === false) {
      if (this.launchSuccess === false) {
        this.launchSuccess = null;
      } else {
        this.launchSuccess = false;
      }
    }
    this.getFilteredLaunchList();
  }
  landingSuccessButton(action) {
    if (action === true) {
      if (this.landingSuccess === true) {
        this.landingSuccess = null;
      } else {
        this.landingSuccess = true;
      }

    } else if (action === false) {
      if (this.landingSuccess === false) {
        this.landingSuccess = null;
      } else {
        this.landingSuccess = false;
      }
    }
    this.getFilteredLaunchList();
  }
  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }
}
