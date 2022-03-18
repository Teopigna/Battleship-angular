import { GameManagerService } from './../services/game-manager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  lifeCounter?: number;

  constructor(public gameManagerService: GameManagerService) { }

  ngOnInit(): void {
    this.lifeCounter = this.gameManagerService.lifeCount;
    this.gameManagerService.lifeChange.subscribe(
      () => {
        this.lifeCounter = this.gameManagerService.lifeCount;
      }
    );
  }

  resetGame(){
    this.gameManagerService.resetGame.emit();
    this.gameManagerService.reset();
    this.lifeCounter = this.gameManagerService.lifeCount;
  }



}
