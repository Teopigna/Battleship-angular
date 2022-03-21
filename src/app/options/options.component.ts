import { GameManagerService } from './../services/game-manager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  show: boolean = false;

  constructor(public gameManagerService: GameManagerService) { }
  
  ngOnInit(): void {
    
  }

  resetGame(){
    this.gameManagerService.resetGame.emit();
    this.gameManagerService.reset();
    this.show = false;
  }

  showBoats(){
    this.gameManagerService.show.emit();
    this.show = !this.show
  }


}
