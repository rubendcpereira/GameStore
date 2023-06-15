import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { GameSliderComponent } from './game-slider/game-slider.component';

@NgModule({
  declarations: [GameSliderComponent],
  imports: [
    CommonModule,
    RouterModule,

    NgbModule, // Bootstrap
  ],
  exports: [
    RouterModule,

    NgbModule,

    GameSliderComponent,
  ],
})
export class SharedModule {}
