import { createPopper } from '@popperjs/core';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TopBarComponent } from './top-bar/top-bar.component';
import { UserNavBarComponent } from './user-nav-bar/user-nav-bar.component';
import { ClgNavBarComponent } from './clg-nav-bar/clg-nav-bar.component';
import { UniNavBarComponent } from './uni-nav-bar/uni-nav-bar.component';
import { EventComponent } from './event/event.component';
import { FilterComponent } from './filter/filter.component';
import {BrowserAnimationsModule} from 
    '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [AppComponent, TopBarComponent, UserNavBarComponent, ClgNavBarComponent, UniNavBarComponent, EventComponent, FilterComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule,BrowserAnimationsModule],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
