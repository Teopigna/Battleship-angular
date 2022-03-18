export class Boat {
    coordinates: string[];
    hits: number[] = [];
    destroyed: boolean = false;

    constructor(coords: string[]){
        this.coordinates = coords;
        for(let coord in coords){
            this.hits.push(0);
        }

    }

    hitBoat(ind: number){
        this.hits[ind] = 1;
        for(let i of this.hits){
            if(i == 0){
                return;
            }
        }
        this.destroyed = true;
    }

    reset(){
        this.destroyed = false;
        this.hits = [];
        for(let coord in this.coordinates){
            this.hits.push(0);
        }
    }
}