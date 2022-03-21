import { GameManagerService } from './../services/game-manager.service';
import { Component, OnInit } from '@angular/core';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-life-points',
  templateUrl: './life-points.component.html',
  styleUrls: ['./life-points.component.css']
})
export class LifePointsComponent implements OnInit {

  lifeCounter: number = 10;
  totalLife: number = 10;
  faIcon = faHeart;
  faIcon2 = faHeartBroken;

  constructor(public gameManagerService: GameManagerService) { }
  
  ngOnInit(): void {
    this.lifeCounter = this.gameManagerService.lifeCount;
    this.gameManagerService.lifeChange.subscribe(
      () => {
        this.lifeCounter = this.gameManagerService.lifeCount;
      }
    );
  }

}
