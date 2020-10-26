import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServerService } from './services/app.service';
import { LaunchListComponent } from './launch-list/launch-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('launchListComponent', {static: true}) launchListComponent: LaunchListComponent;
  title = 'spacex-app';
  subscription: Subscription;
  buttonValMap: Map<number, boolean> = new Map();
  buttonVal = [];
  yearSelected: number;
  launchSuccess: any;
  landingSuccess: any;
  constructor(private service: ServerService) {}

  // tslint:disable: typedef
  ngOnInit() {
    this.launchListComponent.loadLandingList();
    for (let i = 2006; i <= 2020; i++) {
      this.buttonVal.push(i);
      this.buttonValMap.set(i, false);
    }
  }

  // Function triggered when year button is clicked: Used true-false map onyear list to display active/inactive css on button.
  yearsButtonClicked(event) {
    const year = Number(event.target.value);
    if (this.buttonValMap.get(year) === true) {
      this.buttonValMap.set(year, false);
      this.yearSelected = null;
    } else {
      for (const key of this.buttonValMap.keys()) {
        this.buttonValMap.set(key, false);
      }
      this.yearSelected = year;
      this.buttonValMap.set(year, true);
    }
    this.launchListComponent.getFilteredLaunchList(this.yearSelected, this.launchSuccess, this.landingSuccess);
  }

  // Function for launch filter button: Maintained a flag for showing active/Inactive css.
  launchSuccessButtonClicked(action) {
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
    this.launchListComponent.getFilteredLaunchList(this.yearSelected, this.launchSuccess, this.landingSuccess);
  }

  // Function for land filter button: Maintained a flag for showing active/Inactive css.
  landingSuccessButtonClicked(action) {
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
    this.launchListComponent.getFilteredLaunchList(this.yearSelected, this.launchSuccess, this.landingSuccess);
  }
}
