import { Component, Input } from '@angular/core';
import { Game } from 'src/app/core/models/game.model';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent {
  @Input() game!: Game;
}
