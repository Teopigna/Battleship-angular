import { CasellaComponent } from './../casella/casella.component';
import { BoatsManagerService } from './../services/boats-manager.service';
import { GameManagerService } from './../services/game-manager.service';
import { Boat } from './../shared/boat.model';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

const chars: string[] = ['J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
const nums: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

@Component({
  selector: 'app-grid-map',
  templateUrl: './grid-map.component.html',
  styleUrls: ['./grid-map.component.css']
})
export class GridMapComponent implements OnInit {
  
  numList: string[] = [];
  charList: string[] = [];

  boatsList: Boat[] = []
  // Indica se la partita sia finita o meno
  end: boolean = false;

  @ViewChildren(CasellaComponent) customComponents?: QueryList<CasellaComponent>;  
  
  constructor(public gameManagerService: GameManagerService, public boatsManagerService: BoatsManagerService) { }

  ngOnInit(): void {
    this.numList = nums;
    this.charList = chars;
    //Inizializza la lista di navi dal Service
    this.boatsList = this.boatsManagerService.getBoats();

    //Subscribe all'evento reset
    this.gameManagerService.resetGame.subscribe(
      () => {
        
        this.numList = nums;
        
        this.charList = chars;

        this.boatsList = this.boatsManagerService.getBoats();

        this.end = false;

      }
    );
    //Subscribe all'evento vittoria
    this.gameManagerService.won.subscribe(
      () => {
        this.end = true;
      }
    )
    //Subscribe all'evento sconfitta
    this.gameManagerService.lost.subscribe(
      () => {
        this.end = true;
      }
    )
  }
  
  //Gestisce il colpo lanciato direttamente dal click sulla mappa
  checkShot(coord: string){
    for(let boat of this.boatsList){
      if(boat.coordinates.indexOf(coord) > -1){
        boat.hitBoat(boat.coordinates.indexOf(coord));
        //Ogni volta che colpisco una nave controllo se ho vinto
        this.checkWinCondition();
        return;
      }
    }
    this.gameManagerService.loseLife();
  }

  //Gestisce il colpo lanciato dalla pulsantiera
  checkShotInput(coord: string){
    //Cerco la casella contenente la coordinata ricevute in input dalla select
    const cell = this.customComponents?.find(el=> el.coordinate == coord)
    // Setto la casella come colpita (se non lo è già)
    if(cell?.hit == true)
      return;
    cell!.hit = true;
    for(let boat of this.boatsList){
      if(boat.coordinates.indexOf(coord) > -1){
        boat.hitBoat(boat.coordinates.indexOf(coord));
        //Ogni volta che colpisco una nave controllo se ho vinto
        this.checkWinCondition();
        return;
      }
    }
    this.gameManagerService.loseLife();
  }

  // Fun che stabilisce se una cella sia o meno occupata da una nave
  public checkOccupied(coord: string){
    for(let x of this.boatsList){
      if(x.coordinates.includes(coord)){
        return true;
      }
    }
    return false;
  }

  // Fun che stabilisce se le navi siano tutte distrutte 
  checkWinCondition(){
    for(let boat of this.boatsList){
      if(!boat.destroyed){
        return
      }
    }
    this.gameManagerService.winGame();
  }
}
