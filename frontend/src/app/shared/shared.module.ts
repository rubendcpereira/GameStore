import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameCarouselComponent } from './game-carousel/game-carousel.component';
import { RouterModule } from '@angular/router';
import { GameSearchBarComponent } from './game-search-bar/game-search-bar.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    GameCarouselComponent,
    GameSearchBarComponent,
    PaginatorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,

    NgbModule, // Bootstrap
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,

    NgbModule,

    GameCarouselComponent,
    GameSearchBarComponent,
    PaginatorComponent,
  ],
})
export class SharedModule {}
