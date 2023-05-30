import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AppSettings} from '../appSettings';
import {Room, RoomCreate, RoomDetails} from '../models/room';
import {Ball} from '../models/ball';
import {Player, SpielerCreate} from '../models/player';
import {Round} from '../models/round';
import {Bingo} from '../models/bingo';
import {Card} from '../models/card';
import {SpielleiterCreate, SpielleiterToken} from '../models/gamemaster';


@Injectable({providedIn: 'root'})
export class ApiService {

  constructor(protected httpClient: HttpClient) {}

  // Quelle: https://docs.angular.lat/guide/http
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  // KugelResource

  public getKugeln(bingoraumcode: string, runde: number): Observable<HttpResponse<Ball[]>> {
    const url = `${AppSettings.API_ENDPOINT}/raum/${bingoraumcode}/runde/${runde}/kugel`;
    return this.httpClient.get<Ball[]>(url, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  public addGenKugel(bingoraumcode: string, runde: number): Observable<HttpResponse<any>>{
    const url = `${AppSettings.API_ENDPOINT}/raum/${bingoraumcode}/runde/${runde}/kugel`;
    return this.httpClient.post(url, {}, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  public addManKugel(bingoraumcode: string, runde: number, kugel: number): Observable<HttpResponse<any>> {
    const url = `${AppSettings.API_ENDPOINT}/raum/${bingoraumcode}/runde/${runde}/kugel/${kugel}`;
    return this.httpClient.post(url, {}, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  public deleteKugel(bingoraumcode: string, runde: number, kugel: number): Observable<HttpResponse<any>> {
    const url = `${AppSettings.API_ENDPOINT}/raum/${bingoraumcode}/runde/${runde}/kugel/${kugel}`;
    return this.httpClient.delete(url, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  // Room Resource

  public addBingoraum(roomCreate: RoomCreate): Observable<HttpResponse<RoomDetails>> {
    const url = `${AppSettings.API_ENDPOINT}/raum`;
    return this.httpClient.post<RoomDetails>(url, roomCreate, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  public getBingoraum(bingoraumcode: string): Observable<HttpResponse<RoomDetails>> {
    const url = `${AppSettings.API_ENDPOINT}/raum/${bingoraumcode}`;
    return this.httpClient.get<RoomDetails>(url, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  public deleteBingoraum(bingoraumcode: string): Observable<HttpResponse<any>>{
    const url = `${AppSettings.API_ENDPOINT}/raum/${bingoraumcode}`;
    return this.httpClient.delete(url, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  public getAllSpieler(bingoraumcode: string): Observable<HttpResponse<Player[]>>{
    const url = `${AppSettings.API_ENDPOINT}/raum/${bingoraumcode}/spieler`;
    return this.httpClient.get<Player[]>(url, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  public addSpieler(bingoraumcode: string, spielerCreate: SpielerCreate): Observable<HttpResponse<Player>>{
    const url = `${AppSettings.API_ENDPOINT}/raum/${bingoraumcode}/spieler`;
    return this.httpClient.post<Player>(url, spielerCreate, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  // Round Resource

  public getRunde(bingoraumcode: string, runde: number): Observable<HttpResponse<Round>>{
    const url = `${AppSettings.API_ENDPOINT}/raum/${bingoraumcode}/runde/${runde}`;
    return this.httpClient.get<Round>(url, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  public startRunde(bingoraumcode: string, runde: number): Observable<HttpResponse<any>>{
    const url = `${AppSettings.API_ENDPOINT}/raum/${bingoraumcode}/runde/${runde}`;
    return this.httpClient.post(url,{},{ observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  public getBingos(bingoraumcode: string, runde: number): Observable<HttpResponse<Bingo[]>>{
    const url = `${AppSettings.API_ENDPOINT}/raum/${bingoraumcode}/runde/${runde}/bingo`;
    return this.httpClient.get<Bingo[]>(url, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  // Player Resource

  public getSpieler(spielerId: number): Observable<HttpResponse<Player>>{
    const url = `${AppSettings.API_ENDPOINT}/spieler/${spielerId}`;
    return this.httpClient.get<Player>(url, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  public deleteSpieler(spielerId: number): Observable<HttpResponse<any>>{
    const url = `${AppSettings.API_ENDPOINT}/spieler/${spielerId}`;
    return this.httpClient.delete(url, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  public getAllZettelZuRunde(spielerId: number, runde: number): Observable<HttpResponse<Card[]>>{
    const url = `${AppSettings.API_ENDPOINT}/spieler/${spielerId}/runde/${runde}`;
    return this.httpClient.get<Card[]>(url, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  // Gamemaster Resource

  public register(spielleiter: SpielleiterCreate): Observable<HttpResponse<SpielleiterToken>> {
    const url = `${AppSettings.API_ENDPOINT}/spielleiter`;
    return this.httpClient.post<SpielleiterToken>(url, spielleiter, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  public login(spielleiter: SpielleiterCreate): Observable<HttpResponse<SpielleiterToken>>{
    const url = `${AppSettings.API_ENDPOINT}/spielleiter/login`;
    return this.httpClient.post<SpielleiterToken>(url, spielleiter, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  public getAllRoomsToGameMaster(){
    const url = `${AppSettings.API_ENDPOINT}/spielleiter`;
    return this.httpClient.get<RoomDetails[]>(url, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  // Card Resource

  public getZettel(zettelId: number): Observable<HttpResponse<Card>>{
    const url = `${AppSettings.API_ENDPOINT}/zettel/${zettelId}`;
    return this.httpClient.get<Card>(url, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  public bingoEinreichen(zettelId: number): Observable<HttpResponse<any>>{
    const url = `${AppSettings.API_ENDPOINT}/zettel/${zettelId}`;
    return this.httpClient.post(url, {}, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  public feldToggeln(zettelId: number, feldnummer: number): Observable<HttpResponse<any>>{
    const url = `${AppSettings.API_ENDPOINT}/zettel/${zettelId}/feld/${feldnummer}`;
    return this.httpClient.put(url, {}, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }
}
