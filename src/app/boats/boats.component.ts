import { GameManagerService } from './../services/game-manager.service';
import { BoatsManagerService } from './../services/boats-manager.service';
import { Boat } from './../shared/boat.model';
import { Component, OnInit, Input } from '@angular/core';
import { faShip } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-boats',
  templateUrl: './boats.component.html',
  styleUrls: ['./boats.component.css']
})
export class BoatsComponent implements OnInit {

  faIcon = faShip;
  
  boatsList: Boat[] = []

  constructor(public boatsManagerService: BoatsManagerService, public gameManagerService: GameManagerService) { }

  ngOnInit(): void {
    // Inizializza l'array di navi
    this.boatsList = this.boatsManagerService.getBoats();
    // Sottoscrizione all'evento resetGame del GameManagerService
    this.gameManagerService.resetGame.subscribe(
      () => {
        this.boatsList = this.boatsManagerService.getBoats();
      }
    );

  }

}
