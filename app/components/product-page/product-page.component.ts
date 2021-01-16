import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { card } from 'src/app/interfaces/cardInfo';
import { CardPageService } from 'src/app/services/card-page.service';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { DatabaseConnectionService } from 'src/app/services/database-connection.service';
import { BuyDialogComponent } from '../buy-dialog/buy-dialog.component';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  cardDetail: card;
  constructor(
    private cserv: CardPageService,
    private dcon: DatabaseConnectionService,
    public cardsInCartServ: CartServiceService,
    public dialog: MatDialog,
    public authserv:AuthService,
    public router:Router
  ) {
    this.cardDetail = cserv.cardForPage;
    console.log(cserv.cardForPage);
    console.log(this.cardDetail);
  }
  addToCart(cardToAdd: card): void {
    if (this.authserv.userIsSignedIn) {
      this.dcon.addCardToCart(cardToAdd);

    } else {
      this.router.navigate(['/login'])
    }
  }
  openDialog(cardForDialog: card): void {
    this.cardsInCartServ.cartForBuyDialog = cardForDialog;
    this.dialog.open(BuyDialogComponent, {
      data: {
        cardForDialogthis: cardForDialog,
      },
    });
  }
  ngOnInit(): void {
    this.cardDetail = this.cserv.cardForPage;
  }
}
