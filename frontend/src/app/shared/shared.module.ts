import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameCarouselComponent } from './game-carousel/game-carousel.component';
import { RouterModule } from '@angular/router';
import { GameSearchBarComponent } from './game-search-bar/game-search-bar.component';

@NgModule({
  declarations: [GameCarouselComponent, GameSearchBarComponent],
  imports: [
    CommonModule,
    RouterModule,

    NgbModule, // Bootstrap
  ],
  exports: [
    RouterModule,

    NgbModule,

    GameCarouselComponent,
    GameSearchBarComponent,
  ],
})
export class SharedModule {}
