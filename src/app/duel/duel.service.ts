import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DuelService {

  baseUrl = 'localhost:4040';
  api = '/api/duel';
  url = this.baseUrl + this.api;

  constructor(private http: HttpClient) { }

  getDuelRoomById(id) {
    let duelRoom = this.http.get(`${this.url}/${id}`);
    return duelRoom;
  }
}
