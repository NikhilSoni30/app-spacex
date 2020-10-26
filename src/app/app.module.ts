import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ServerService } from './services/app.service';
import { HttpClientModule } from '@angular/common/http';
import { LaunchListComponent } from './launch-list/launch-list.component';

@NgModule({
  declarations: [AppComponent, LaunchListComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [ServerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
