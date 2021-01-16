import { Injectable } from '@angular/core';
import { card } from '../interfaces/cardInfo';

@Injectable({
  providedIn: 'root',
})
export class CardPageService {
  cardForPage: card;
  constructor() {}
}
