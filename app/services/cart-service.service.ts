import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { card } from '../interfaces/cardInfo';
import { DatabaseConnectionService } from './database-connection.service';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  cartForBuyDialog: card;
  constructor() {}
}
