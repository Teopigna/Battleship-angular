import { GameManagerService } from './services/game-manager.service';
import { Component, OnInit } from '@angular/core';
import { faAnchor } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  faIcon = faAnchor;

  constructor(public gameManagerService: GameManagerService) {}

  win: boolean = false;
  lose: boolean = false;

  ngOnInit(): void {
    this.gameManagerService.resetGame.subscribe(
      () => {
        this.win = false;
        this.lose = false;
      }
    );
    this.gameManagerService.won.subscribe(
      () => {
        this.win = true;
      }
    );
    this.gameManagerService.lost.subscribe(
      () => {
        this.lose = true;
      }
    );
  }

}
