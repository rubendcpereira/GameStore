import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/core/models/game.model';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public games$!: Observable<Game[]>;

  constructor(private gameService: GameService) {}

  public ngOnInit(): void {
    this.games$ = this.getGames();
  }

  private getGames(): Observable<Game[]> {
    return this.gameService.getGames();
  }
}
