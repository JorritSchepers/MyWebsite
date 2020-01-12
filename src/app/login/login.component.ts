import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private titleService: Title) {
    this.titleService.setTitle("Jorrit's Website | Login")
  }

  changePath(path: string): void {
    window.location.pathname = path;
  }
}
