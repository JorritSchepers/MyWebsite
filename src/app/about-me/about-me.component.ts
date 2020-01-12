import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent {

  constructor(private titleService: Title) {
    this.titleService.setTitle("Jorrit's Website | About me")
  }

  aboutMe(path: string): void {
    window.location.pathname = path;
  }
}
