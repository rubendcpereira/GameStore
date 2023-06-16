import { Component, Input } from '@angular/core';
import { Game } from 'src/app/core/models/game.model';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-game-carousel',
  templateUrl: './game-carousel.component.html',
  styleUrls: [],
})
export class GameCarouselComponent {
  @Input() games: Game[] = [];

  urlPath!: string;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.urlPath = this.getUrlPath();
  }

  getUrlPath(): string {
    return this.gameService.getUrlPath();
  }
}
