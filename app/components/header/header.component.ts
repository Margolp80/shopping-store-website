import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { CartServiceService } from "src/app/services/cart-service.service";
import { DatabaseConnectionService } from "src/app/services/database-connection.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isLogedIn: any;

  constructor(
    private router: Router,
    private authserve: AuthService,
    private con: DatabaseConnectionService
  ) {
    this.isLogedIn = authserve.userIsSignedIn;
  }
  productsInCart: number = 0;
  ngOnInit(): void {
    this.con.checkCart.subscribe((num: number) => (this.productsInCart = num));
  }

  logOut() {
    localStorage.setItem("User", "");
  }

  checkIfUserIsLoggedIn() {
    return localStorage.getItem("User");
  }
  onViewcartClicked() {
    if (localStorage.getItem("User")) {
      this.router.navigate(["/cart"]);
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
