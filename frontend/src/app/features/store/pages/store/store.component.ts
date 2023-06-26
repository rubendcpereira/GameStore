import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/core/models/game.model';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
})
export class StoreComponent implements OnInit {
  public games$!: Observable<Game[]>;
  public page: number = 1;
  public pageSize: number = 5;

  constructor(private gameService: GameService) {}

  public ngOnInit(): void {
    this.getGames();
  }

  public getGamesByPrefix(prefix: string): void {
    this.games$ = this.gameService.getGamesByPrefix(prefix);
  }

  private getGames(): void {
    this.games$ = this.gameService.getGames();
  }
}
