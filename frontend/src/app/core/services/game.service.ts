import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly URL_PATH: string = '/games';

  constructor(private http: HttpClient) {}

  getUrlPath(): string {
    return this.URL_PATH;
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.URL_PATH);
  }

  getGamesByPrefix(prefix: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.URL_PATH}?name=${prefix}`);
  }

  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.URL_PATH}/${id}`);
  }
}
