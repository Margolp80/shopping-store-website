import { Component, OnInit } from '@angular/core';
import { drinks } from 'src/app/cards-const-arrays/drinks';
import { fruits } from 'src/app/cards-const-arrays/fruits';
import { meat } from 'src/app/cards-const-arrays/meat';
import { vegetables } from 'src/app/cards-const-arrays/vegetables';
import { card } from 'src/app/interfaces/cardInfo';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  cardsCategory: card[] = fruits;
  
  constructor() {}

  onClickCategory(cat: string): void {
    switch (cat) {
      case 'drinks': {
        this.cardsCategory = drinks;
        break;
      }
      case 'fruits': {
        this.cardsCategory = fruits;
        break;
      }
      case 'vegetables': {
        this.cardsCategory = vegetables;
        break;
      }
      case 'meat': {
        this.cardsCategory = meat;
        break;
      }
    }
  }

  ngOnInit(): void {}
}
