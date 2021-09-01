import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';

import { Leader } from '../shared/leader';
import { LeadersService } from '../services/leaders.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish:Dish;
  promotion:Promotion;
  leader:Leader;


  constructor(private dishService:DishService, private promotionService:PromotionService, private leeaderService:LeadersService) { }

  ngOnInit() {
    this.dishService.getFeaturedDish().then((dish)=>this.dish=dish);
    this.promotionService.getFeaturedPromotion().then((promotion)=>this.promotion=promotion);
    this.leeaderService.getFeaturedLeader().then((leader)=>this.leader=leader);
  }

}
