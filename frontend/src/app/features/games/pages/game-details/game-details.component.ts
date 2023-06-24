import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, catchError, takeUntil, throwError } from 'rxjs';
import { Game } from 'src/app/core/models/game.model';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
})
export class GameDetailsComponent implements OnInit, OnDestroy {
  public game!: Game;

  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.getGameById(this.activatedRoute.snapshot.params['id']);
  }

  getGameById(id: string): void {
    this.gameService
      .getGameById(id)
      .pipe(
        catchError((err) => {
          this.router.navigate(['/']);
          return throwError(() => err);
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((game) => {
        this.game = game;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
