import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { Game } from 'src/app/core/models/game.model';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-game-search-bar',
  templateUrl: './game-search-bar.component.html',
  styleUrls: ['./game-search-bar.component.css'],
})
export class GameSearchBarComponent implements OnInit {
  @Output() newSearchEvent = new EventEmitter<string>();

  public games$!: Observable<Game[]>;
  private searchValues = new Subject<string>();

  constructor(private gameService: GameService) {}

  public ngOnInit(): void {
    this.games$ = this.searchValues.pipe(
      // Waits 300ms after each keystroke before considering the result
      debounceTime(300),

      // Ignores new result if same as previous result
      distinctUntilChanged(),

      // Switches to new search observable each time the result changes
      switchMap((searchValue: string) =>
        this.gameService.getGamesByPrefix(searchValue)
      )
    );
  }

  public addSearchValue(value: string): void {
    this.searchValues.next(value);
  }

  public dispatchNewSearchEvent(value: string) {
    this.newSearchEvent.emit(value);
  }
}
