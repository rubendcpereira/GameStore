import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameCardComponent } from './pages/store/components/game-card/game-card.component';
import { StoreComponent } from './pages/store/store.component';
import { StoreRoutingModule } from './store-routing.module';

@NgModule({
  declarations: [StoreComponent, GameCardComponent],
  imports: [SharedModule, StoreRoutingModule],
})
export class StoreModule {}
