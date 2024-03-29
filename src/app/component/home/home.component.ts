import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TTTModel } from '../../model/ttt.model';
import { FormBuilder } from '@angular/forms';
import { WindowManagerModel } from 'src/app/model/window-manager.model';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pictureId: number = 0;

  windowManager: WindowManagerModel = new WindowManagerModel()
  ttt: TTTModel = new TTTModel();

  searchForm: any;
  cmdForm: any;
  currentTime: Date = new Date();
  currentCommand: string;

  inputValue: string = "Hoi, mijn naam is Jorrit Schepers en ik ben tweede jaars ICT student op Hogeschool van Arnhem en Nijmegen."

  constructor(private titleService: Title, private formBuilder: FormBuilder) {
    this.titleService.setTitle("Jorrit's Website | Home");
    this.searchForm = this.formBuilder.group({
      word: ''
    });
    this.cmdForm = this.formBuilder.group({
      cmd: ''
    });

    setInterval(() => {
      this.currentTime = new Date();
    }, 2);
  }

  searchWord(formValue: any): void {
    let url = "https://www.google.com/search?q=" + formValue.word;
    window.open(url);
  }

  logout(): void {
    window.location.pathname = '/login'
  }

  openPicture(id: number): void {
    this.windowManager.showingStart = false;
    this.pictureId = id;
  }

  enterCommand(formValue: any): void {
    this.currentCommand = formValue.cmd;
  }
}