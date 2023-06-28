import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { GamesRoutingModule } from './games-routing.module';
import { GameDetailsComponent } from './pages/game-details/game-details.component';

@NgModule({
  declarations: [GameDetailsComponent],
  imports: [SharedModule, GamesRoutingModule],
})
export class GamesModule {}
