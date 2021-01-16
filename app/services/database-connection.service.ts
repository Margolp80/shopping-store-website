import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { card } from "../interfaces/cardInfo";

@Injectable({
  providedIn: "root",
})
export class DatabaseConnectionService implements OnInit {
  cards$ = [];
  Trades$ = [];
  keys = [];
  checkCart: EventEmitter<number> = new EventEmitter<number>();

  constructor(private db: AngularFireDatabase) {}
  productsInCart: number = 0;

  ngOnInit(): void {
    this.getAllCardsInCart().subscribe((data) => {
      if (this.cards$) this.cards$ = [];
      data.map((changes) => {
        this.cards$.push(changes.payload.val());
        this.keys.push({ key: changes.payload.key });
        this.checkCart.emit(this.cards$.length);
        console.log("cards$ length is :" + this.cards$.length);
      });
    });
  }
  getAllCardsInCart() {
    try {
      console.log("check!");
      return this.db.list("/cart").snapshotChanges();
    } catch (error) {
      console.log(error);
    }
  }

  addCardToCart(cardToAdd: card) {
    return this.db.list("/cart").push(cardToAdd);
  }

  deleteOneCardFromCart(cardKey: string) {
    return this.db.object("/cart/" + cardKey).remove();
  }

  delAllCardsFromCart() {
    return this.db.object("/cart/").remove();
  }
}
