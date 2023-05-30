import { Injectable, NgZone } from '@angular/core';
import { Observable} from 'rxjs';
import {AppSettings} from '../appSettings';

@Injectable({
  providedIn: 'root'
})
export class ApiStreamService {
  private eventSources: EventSource[] = [];

  constructor(private zone: NgZone) { }

  public getBalls(bingoraumcode: string, runde: number): any {
    const url = `${AppSettings.API_ENDPOINT}/raum/${bingoraumcode}/runde/${runde}/kugel/stream`;
    return new Observable<any>((observer) => {
      const sse = new EventSource(url);
      sse.addEventListener('KugelEvent', event => this.zone.run(() => observer.next(event)));
      sse.onerror = error => this.zone.run(() => observer.error(error));
      this.eventSources.push(sse);
    });
  }

  public getRound(bingoraumcode: string, runde: number): any {
    const url = `${AppSettings.API_ENDPOINT}/raum/${bingoraumcode}/runde/${runde}/stream`;
    return new Observable<any>((observer) => {
      const sse = new EventSource(url);
      sse.addEventListener('RundeEvent', event => this.zone.run(() => observer.next(event)));
      sse.onerror = error => this.zone.run(() => observer.error(error));
      this.eventSources.push(sse);
    });
  }

  public getPlayer(bingoraumcode: string): any {
    const url = `${AppSettings.API_ENDPOINT}/raum/${bingoraumcode}/spieler/stream`;
    return new Observable<any>((observer) => {
      const sse = new EventSource(url);
      sse.addEventListener('SpielerEvent', event => this.zone.run(() => observer.next(event)));
      sse.onerror = error => this.zone.run(() => observer.error(error));
      this.eventSources.push(sse);
    });
  }

  public getBingo(bingoraumcode: string, round: number): any {
    const url = `${AppSettings.API_ENDPOINT}/raum/${bingoraumcode}/runde/${round}/bingo/stream`;
    return new Observable<any>((observer) => {
      const sse = new EventSource(url);
      sse.addEventListener('BingoEvent', event => this.zone.run(() => observer.next(event)));
      sse.onerror = error => this.zone.run(() => observer.error(error));
      this.eventSources.push(sse);
    });
  }

  public closeEventSources(){
    for(const eventSource of this.eventSources){
      eventSource.close();
    }
    this.eventSources = [];
  }
}
