import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { AuthService } from "src/app/auth/auth.service";
import { card } from "src/app/interfaces/cardInfo";
import { CartServiceService } from "src/app/services/cart-service.service";
import { DatabaseConnectionService } from "src/app/services/database-connection.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  cards$ = [];
  Trades$ = [];
  keys = [];
  cartTotalCoast: number = 0;

  isLogedIn: any;

  constructor(
    private db: AngularFireDatabase,
    private con: DatabaseConnectionService,
    private cser: CartServiceService,
    private authserv: AuthService
  ) {
    if (this.authserv.userIsSignedIn) {
      this.initialize();
    }
    this.isLogedIn = authserv.userIsSignedIn;
  }

  checkIfUserIsLoggedIn() {
    if (this.isLogedIn) return true;
    return false;
  }

  initialize() {
    this.con.getAllCardsInCart().subscribe((data) => {
      if (this.cards$) this.cards$ = [];
      data.map((changes) => {
        this.cards$.push(changes.payload.val());
        this.keys.push({ key: changes.payload.key });
        this.updateCostOfCard();
        console.log("cards$ length is :" + this.cards$.length);
        this.con.checkCart.emit(this.cards$.length);
      });
    });
  }

  deleteOneCard(crdToDel: card) {
    this.cartTotalCoast = 0;
    for (let i = 0; i < this.cards$.length; i++) {
      if (this.cards$[i].title === crdToDel.title) {
        console.log(this.keys[i].key);

        this.con.deleteOneCardFromCart(this.keys[i].key as string);
      }
    }
    this.updateCostOfCard();
  }

  updateCostOfCard(): void {
    this.cartTotalCoast = 0;
    console.log("Update coast of cards works");
    this.cartTotalCoast = 0;
    for (let i = 0; i < this.cards$.length; i++) {
      this.cartTotalCoast += this.cards$[i].price;
      console.log(this.cartTotalCoast);
    }
  }

  ngOnInit(): void {}
}
