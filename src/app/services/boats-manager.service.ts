import { GameManagerService } from './game-manager.service';
import { Injectable } from '@angular/core';
import { Boat } from './../shared/boat.model';

@Injectable()
export class BoatsManagerService {

    // Strutture necessarie al piazzamento randomico delle navi
    private directions: string[] = ['r', 'l', 'u', 'd'];
    private coordChar: string[] = ['J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    private coordNum: string[] =  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    private boatsLen: number[] = [4, 3, 3, 2, 2, 1, 1, 1, 1]; 
    private occupiedCells: string[] = [];
    // Struttura che contiene le navi generate casualmente
    boatsList: Boat[] = []
    
    constructor(public gameManagerService: GameManagerService) {

        this.placeBoats();

        this.gameManagerService.resetGame.subscribe(
            () => {
                // Svuota la lista delle navi e delle celle occupate
                this.boatsList = [];
                this.occupiedCells = [];
                // Rigenera casualmente le navi
                this.placeBoats();
            }
        );
    }

    getBoats(): Boat[] {
        return this.boatsList;
    }

    // Piazza le navi in modo randomico
    private placeBoats(){
        for(let l of this.boatsLen){
            let ok = false;
            while(!ok){
                let dir = this.pickDirection();
                let startPositionChar = this.pickCharPosition();
                let startPositionNum = this.pickNumPosition();
                switch(dir){
                    case 'r': {
                        let pos = this.coordNum.indexOf(startPositionNum);
                        if((pos + l-1) < this.coordNum.length){
                            let positions = [startPositionChar+startPositionNum];
                            for(let i=1; i<l; i++){
                                positions.push(startPositionChar+this.coordNum[pos+i]);
                            }
                            if(this.checkPlaceable(positions)){
                                let b = new Boat(positions);
                                this.occupiedCells = this.occupiedCells.concat(positions);
                                this.boatsList.push(b);
                                ok = true;
                            }
                        }
                        break;
                    }
                    case 'l': {
                        let pos = this.coordNum.indexOf(startPositionNum);
                        if((pos - l+1) >= 0){
                            let positions = [startPositionChar+startPositionNum];
                            for(let i=1; i<l; i++){
                                positions.push(startPositionChar+this.coordNum[pos-i]);
                            }
                            if(this.checkPlaceable(positions)){
                                let b = new Boat(positions);
                                this.occupiedCells = this.occupiedCells.concat(positions);
                                this.boatsList.push(b);
                                ok = true;
                            }
                        }
                        break;
                    }
                    case 'u': { //Up placeament case
                        let pos = this.coordChar.indexOf(startPositionChar);
                        if((pos-l+1)>=0){
                            let positions = [startPositionChar+startPositionNum];
                            for(let i=1; i<l; i++){
                                positions.push(this.coordChar[pos-i]+startPositionNum);
                            }
                            if(this.checkPlaceable(positions)){
                                let b = new Boat(positions);
                                this.occupiedCells = this.occupiedCells.concat(positions);
                                this.boatsList.push(b);
                                ok = true;
                            }
                        }
                        break;
                    }
                    case 'd': { //Down placeament case
                        let pos = this.coordChar.indexOf(startPositionChar);
                        if((pos + l-1) < this.coordChar.length){
                            let positions = [startPositionChar+startPositionNum];
                            for(let i=1; i<l; i++){
                                positions.push(this.coordChar[pos+i]+startPositionNum);
                            }
                            if(this.checkPlaceable(positions)){
                                let b = new Boat(positions);
                                this.occupiedCells = this.occupiedCells.concat(positions);
                                this.boatsList.push(b);
                                ok = true;
                            }
                        }
                        break;
                    }
                }
            }  
                
        }
    }

    // Sceglie la coordinata Letterale in modo randomico
    private pickCharPosition() : string {
        return( 
            this.coordChar[Math.floor(Math.random() * (this.coordChar.length))]
        );
    }
    // Sceglie la coordinata Numerica in modo randomico
    private pickNumPosition() : string {
        return( 
            this.coordNum[Math.floor(Math.random() * (this.coordNum.length))]
        );
    }
    // Sceglie la direzione in modo randomico
    private pickDirection() : string {
        return this.directions[Math.floor(Math.random() * this.directions.length)];
    }

    // Controlla che fra le posizioni scelte non ve ne sia una occupata
    private checkPlaceable(positions: string[]): boolean{
        for(let pos of positions){
            if(this.occupiedCells.indexOf(pos) > -1){
                return false;
            }
        }
        return true;
    }
}