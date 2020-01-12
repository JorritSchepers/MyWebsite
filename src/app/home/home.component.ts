import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

const CMD_ID: number = 1;
const WORD_ID: number = 2;
const TTT_ID: number = 3;

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pictureId: number = 0;
  showingTicTacToe: boolean = false;
  pageZIndexes: number[] = [TTT_ID, WORD_ID, CMD_ID]
  wordZIndex: number = 1;
  cmdZIndex: number = 1;
  tttZIndex: number = 1;

  constructor(private titleService: Title) {
    this.titleService.setTitle("Jorrit's Website | Home")
  }

  changePath(path: string): void {
    window.location.pathname = path;
  }

  moveWordToFront(): void {
    this.pageZIndexes.splice(this.getCurrentIndex(WORD_ID), 1);
    this.pageZIndexes.push(WORD_ID);
    this.updateAllIndexes();
  }
  
  moveCmdToFront(): void {
    this.pageZIndexes.splice(this.getCurrentIndex(CMD_ID), 1);
    this.pageZIndexes.push(CMD_ID);
    this.updateAllIndexes();
  }

  moveTttToFront(): void {
    this.pageZIndexes.splice(this.getCurrentIndex(TTT_ID), 1);
    this.pageZIndexes.push(TTT_ID);
    this.updateAllIndexes();
  }

  updateAllIndexes(): void {
    this.cmdZIndex = this.getCurrentIndex(CMD_ID)+1;
    this.wordZIndex = this.getCurrentIndex(WORD_ID)+1;
    this.tttZIndex = this.getCurrentIndex(TTT_ID)+1;
  }

  openTtt(): void {
    this.moveTttToFront();
    this.showingTicTacToe = true
  }

  private getCurrentIndex(id: number): number {
    for (let i=0;i<this.pageZIndexes.length;i++) {
      if (this.pageZIndexes[i] == id) return i;
    }
    return -1;
  }
}
