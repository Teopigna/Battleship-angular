import { BoatsManagerService } from './services/boats-manager.service';
import { GameManagerService } from './services/game-manager.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GridMapComponent } from './grid-map/grid-map.component';
import { CasellaComponent } from './casella/casella.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BoatsComponent } from './boats/boats.component';
import { OptionsComponent } from './options/options.component';

@NgModule({
  declarations: [
    AppComponent,
    GridMapComponent,
    CasellaComponent,
    BoatsComponent,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule 
  ],
  providers: [GameManagerService, BoatsManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
