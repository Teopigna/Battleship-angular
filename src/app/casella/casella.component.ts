import { GameManagerService } from './../services/game-manager.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faBan, faShip } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-casella',
  templateUrl: './casella.component.html',
  styleUrls: ['./casella.component.css']
})
export class CasellaComponent implements OnInit {

  @Input() coordinate: string = '';
  @Input() occupied: boolean = false;
  
  faIcon = faBan;
  faIconHit = faShip;

  //Variabili che servono a disabilitare il bottone presente sul component
  hit: boolean = false;
  end: boolean = false;
  
  //Evento emesso nel momento del click
  @Output() shot = new EventEmitter<string>();

  constructor(public gameManagerService: GameManagerService) { }

  ngOnInit(): void {
    //Subscribe all'evento reset
    this.gameManagerService.resetGame.subscribe(
      () => {
        this.hit = false;
        this.end = false;
      }
    )
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
  // Fun lanciata al click della casella
  public onShoot() {
    this.shot.emit(this.coordinate);
    this.hit = true;
  }

}
