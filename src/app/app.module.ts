import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutMeComponent } from './about-me/about-me.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent
    ,LoginComponent
    ,HomeComponent
    ,AboutMeComponent
  ],
  imports: [
    BrowserModule
    ,AppRoutingModule
    ,DragDropModule 
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
