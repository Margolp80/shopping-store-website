import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { database } from 'firebase';
import { card } from 'src/app/interfaces/cardInfo';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { DialogData } from '../main/card/card.component';

@Component({
  selector: 'app-buy-dialog',
  templateUrl: './buy-dialog.component.html',
  styleUrls: ['./buy-dialog.component.css'],
})
export class BuyDialogComponent implements OnInit {
  cardToBuyData: card;
  constructor(cserv: CartServiceService) {
    this.cardToBuyData = cserv.cartForBuyDialog;
  }

  ngOnInit(): void {}
}
