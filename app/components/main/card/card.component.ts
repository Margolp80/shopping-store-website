import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { card } from 'src/app/interfaces/cardInfo';
import { CardPageService } from 'src/app/services/card-page.service';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { DatabaseConnectionService } from 'src/app/services/database-connection.service';
import { BuyDialogComponent } from '../../buy-dialog/buy-dialog.component';

export interface DialogData {
  cardForDialogthis: card;
}
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input('cardsInformation') card: card;
  @Input('isCart') IsCart: boolean = true;
  @Output('removeClicked') remove = new EventEmitter<card>();
  @Output('AddClicked') added = new EventEmitter<number>();

  constructor(
    private cardsInCartServ: CartServiceService,
    private dbcon: DatabaseConnectionService,
    private cpage: CardPageService,
    public dialog: MatDialog,
    public authser:AuthService,
    public router:Router
  ) {}

  
  onAddToCart(cardToAdd: card) {
    if (this.authser.userIsSignedIn) {
      this.dbcon.addCardToCart(cardToAdd);
      this.added.emit(cardToAdd.price);
    }
    else{
      this.router.navigate(['login']); 
    }
  }

  deleteOneFromCart(deleteCard: card) {
    this.remove.emit(deleteCard);
  }

  deleteAll() {
    this.dbcon.delAllCardsFromCart();
  }

  displayCard(cardToDisplay: card): void {
    this.cpage.cardForPage = cardToDisplay;
    console.log(this.cpage.cardForPage);
  }
  openDialog(cardForDialog: card): void {
    this.cardsInCartServ.cartForBuyDialog = cardForDialog;
    this.dialog.open(BuyDialogComponent, {
      data: {
        cardForDialogthis: cardForDialog,
      },
    });
  }
  ngOnInit(): void {}
}
