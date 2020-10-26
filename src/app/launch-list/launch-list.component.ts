import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerService } from '../services/app.service';
import { Subscription } from 'rxjs';
import { LaunchDetails } from '../model/app.interface';


@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrls: ['../app.component.css']
})
export class LaunchListComponent implements OnInit, OnDestroy {
  launchData: LaunchDetails[] = [];
  subscription: Subscription;
  noDetails = false;
  constructor(private service: ServerService) {}

  ngOnInit(): void {
  }

  // This will be used to call the API for getting data list when user is loading the website for the first time without any filters.
  // tslint:disable: typedef
  loadLandingList() {
    this.subscription = this.service.getLandingList().subscribe((response: any[]) => {
      this.setLaunchDisplayData(response);
        },
        (error) => {
          throw error;
        }
      );
    }

  // Triggers every time a filter is selected on screen.
  getFilteredLaunchList(yearSelected, launchSuccess, landingSuccess) {
    this.subscription = this.service.getFilteredList(yearSelected, launchSuccess, landingSuccess).subscribe(response => {
      this.setLaunchDisplayData(response);
    }, error => {
      throw error;
    });
  }

  // Setting the response from API in local variable to display on page.
  setLaunchDisplayData(response) {
    this.launchData = [];
    for (const item of response) {
      const launchObj = new LaunchDetails();
      launchObj.flightNumber = item.flight_number;
      if (item.rocket.first_stage.cores[0].land_success === true) {
        launchObj.landSuccess = item.rocket.first_stage.cores[0].land_success;
      } else {
        launchObj.landSuccess = 'false';
      }
      launchObj.launchSuccess = item.launch_success;
      launchObj.launchYear = item.launch_year;
      launchObj.missionIds = item.mission_id;
      launchObj.missionName = item.mission_name;
      if (item.links.mission_patch_small !== null ) {
        launchObj.imgSrc = item.links.mission_patch_small;
      } else {
        launchObj.imgSrc = 'assets/broken.png';
      }
      this.launchData.push(launchObj);
    }
    // To show message when there is no data returned from API call.
    if (this.launchData.length === 0) {
      this.noDetails = true;
    } else {
      this.noDetails = false;
    }
  }

  ngOnDestroy() {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
  }
}
