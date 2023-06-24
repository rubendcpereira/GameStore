import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [GameDetailsComponent],
  imports: [
    CommonModule,

    CoreModule,
    SharedModule,
    
    GamesRoutingModule
  ],
})
export class GamesModule {}
