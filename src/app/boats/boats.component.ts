import { GameManagerService } from './../services/game-manager.service';
import { BoatsManagerService } from './../services/boats-manager.service';
import { Boat } from './../shared/boat.model';
import { Component, OnInit, Input } from '@angular/core';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-boats',
  templateUrl: './boats.component.html',
  styleUrls: ['./boats.component.css']
})
export class BoatsComponent implements OnInit {

  faIcon = faSquareFull;
  
  boatsList: Boat[] = []

  constructor(public boatsManagerService: BoatsManagerService, public gameManagerService: GameManagerService) { }

  ngOnInit(): void {
    
    this.boatsList = this.boatsManagerService.getBoats();
    
    this.gameManagerService.resetGame.subscribe(
      () => {
        this.boatsList = this.boatsManagerService.getBoats();
      }
    );

  }

}
