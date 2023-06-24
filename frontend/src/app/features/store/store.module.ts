import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './pages/store/store.component';
import { StoreRoutingModule } from './store-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameCardComponent } from './pages/store/components/game-card/game-card.component';

@NgModule({
  declarations: [StoreComponent, GameCardComponent],
  imports: [
    CommonModule,

    CoreModule,
    SharedModule,
    
    StoreRoutingModule
  ],
})
export class StoreModule {}
