import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TTTModel } from '../../model/ttt.model';
import { FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  CMD_ID: number = 1;
  WORD_ID: number = 2;
  TTT_ID: number = 3;
  BROWSER_ID: number = 4;

  pictureId: number = 0;

  showingTicTacToe: boolean = false;
  showingWord: boolean = false;
  showingCmd: boolean = false;
  showingBrowser: boolean = false;
  showingStart: boolean = false;

  pageZIndexes: number[] = [this.TTT_ID, this.WORD_ID, this.CMD_ID, this.BROWSER_ID];
  wordZIndex: number = 1;
  cmdZIndex: number = 1;
  tttZIndex: number = 1
  browserZIndex: number = 1;

  ttt: TTTModel = new TTTModel();

  searchForm: any;
  currentSearchWordUrl: string;

  constructor(private titleService: Title, private formBuilder: FormBuilder) {
    this.titleService.setTitle("Jorrit's Website | Home");
    this.searchForm = this.formBuilder.group({
      word: ''
    });
  }

  moveTabToFront(id: number): void {
    this.showingStart = false;
    this.pageZIndexes.splice(this.getCurrentIndex(id), 1);
    this.pageZIndexes.push(id);
    this.updateAllIndexes();
  }

  updateAllIndexes(): void {
    this.cmdZIndex = this.getCurrentIndex(this.CMD_ID)+1;
    this.wordZIndex = this.getCurrentIndex(this.WORD_ID)+1;
    this.tttZIndex = this.getCurrentIndex(this.TTT_ID)+1;
    this.browserZIndex = this.getCurrentIndex(this.BROWSER_ID)+1;
  }

  openTab(id: number): void {
    this.moveTabToFront(id);
    switch (id) {
      case this.CMD_ID:
        this.showingCmd = true;
        break;
      case this.WORD_ID:
        this.showingWord = true;
        break;
      case this.TTT_ID:
        this.showingTicTacToe = true;
        break;
      case this.BROWSER_ID:
        this.showingBrowser = true;
        break;
    }
  }

  closeTab(id: number): void {
    switch (id) {
      case this.CMD_ID:
        this.showingCmd = false;
        break;
      case this.WORD_ID:
        this.showingWord = false;
        break;
      case this.TTT_ID:
        this.showingTicTacToe = false;
        break;
      case this.BROWSER_ID:
        this.showingBrowser = false;
        break;
    }
  }

  private getCurrentIndex(id: number): number {
    for (let i=0;i<this.pageZIndexes.length;i++) {
      if (this.pageZIndexes[i] == id) return i;
    }
    return -1;
  }

  searchWord(formValue: any): void {
    this.currentSearchWordUrl = "https://www.google.com/search?q=" + formValue.word;
    window.open(this.currentSearchWordUrl);
  }

  logout(): void {
    window.location.pathname = '/login'
  }

  openPicture(id: number): void {
    this.showingStart = false;
    this.pictureId = id;
  }
}