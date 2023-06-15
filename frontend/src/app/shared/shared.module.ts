import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameCarouselComponent } from './game-carousel/game-carousel.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [GameCarouselComponent],
  imports: [
    CommonModule,
    RouterModule,
    
    NgbModule, // Bootstrap
  ],
  exports: [
    RouterModule,
    
    NgbModule,
    
    GameCarouselComponent,
  ],
})
export class SharedModule {}
