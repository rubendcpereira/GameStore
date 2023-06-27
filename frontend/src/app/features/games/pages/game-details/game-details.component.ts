import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, first, throwError } from 'rxjs';
import { Game } from 'src/app/core/models/game.model';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
})
export class GameDetailsComponent implements OnInit {
  public game!: Game;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) {}

  public ngOnInit(): void {
    this.getGameById(this.activatedRoute.snapshot.params['id']);
  }

  private getGameById(id: string): void {
    this.gameService
      .getGameById(id)
      .pipe(
        first(),
        catchError((err) => {
          this.router.navigate(['/']);
          return throwError(() => err);
        })
      )
      .subscribe((game) => {
        this.game = game;
      });
  }
}
