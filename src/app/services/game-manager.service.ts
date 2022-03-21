import { EventEmitter } from "@angular/core";

export class GameManagerService {
    
    lifeCount: number = 10;

    //Evento emesso al momento del Restart Game
    resetGame = new EventEmitter();
    //Evento emesso al cambiare della vita
    lifeChange = new EventEmitter();
    //Eventi emessi rispettivamente per la vittoria e la sconfitta
    won = new EventEmitter();
    lost = new EventEmitter();
    //Evento emesso quando si mostrano/nascondono le navi
    show = new EventEmitter();
    
    loseLife(){
        this.lifeCount -= 1;
        this.lifeChange.emit();
        if(this.lifeCount == 0)
            this.loseGame();
    }

    loseGame(){
        this.lost.emit();
    }

    winGame(){
        this.won.emit();
    }

    reset(){
        this.lifeCount = 10;
        this.lifeChange.emit();
    }
}