import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/core/models/game.model';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  public games$!: Observable<Game[]>;
  public page: number = 1;
  public pageSize: number = 6;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this.games$ = this.gameService.getGames();
  }

  getGamesByPrefix(prefix: string): void {
    this.games$ = this.gameService.getGamesByPrefix(prefix);
  }
}
