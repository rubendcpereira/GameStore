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

  games$!: Observable<Game[]>;
  private searchValues = new Subject<string>();

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.games$ = this.searchValues.pipe(
      // waits 300ms after each keystroke before considering the result
      debounceTime(300),

      // ignores new result if same as previous result
      distinctUntilChanged(),

      // switches to new search observable each time the result changes
      switchMap((searchValue: string) =>
        this.gameService.getGamesByPrefix(searchValue)
      )
    );
  }

  addSearchValue(value: string): void {
    this.searchValues.next(value);
  }

  dispatchNewSearchEvent(value: string) {
    this.newSearchEvent.emit(value);
  }
}
