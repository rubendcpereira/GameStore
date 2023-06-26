import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly urlPath: string = '/games';

  constructor(private http: HttpClient) {}

  getUrlPath(): string {
    return this.urlPath;
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.urlPath);
  }

  getGamesByPrefix(prefix: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.urlPath}?name=${prefix}`);
  }

  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.urlPath}/${id}`);
  }
}
