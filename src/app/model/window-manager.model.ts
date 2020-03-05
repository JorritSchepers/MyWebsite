export class WindowManagerModel {
    CMD_ID: number = 1;
    WORD_ID: number = 2;
    TTT_ID: number = 3;
    BROWSER_ID: number = 4;
    
    showingTicTacToe: boolean = false;
    showingWord: boolean = true;
    showingCmd: boolean = true;
    showingBrowser: boolean = false;
    showingStart: boolean = false;

    pageZIndexes: number[] = [this.TTT_ID, this.WORD_ID, this.CMD_ID, this.BROWSER_ID];
    wordZIndex: number = 1;
    cmdZIndex: number = 1;
    tttZIndex: number = 1
    browserZIndex: number = 1;

    constructor() {}

    moveTabToFront(id: number): void {
        this.showingStart = false;
        this.pageZIndexes.splice(this.getCurrentIndex(id), 1);
        this.pageZIndexes.push(id);
        this.updateAllIndexes();
      }
    
      private updateAllIndexes(): void {
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
}