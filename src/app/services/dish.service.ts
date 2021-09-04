import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';

// import { DISHES } from '../shared/dishes';

import {Observable,of} from 'rxjs';
import {delay } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import {map, catchError} from 'rxjs/operators';
import { ProcessHttPMsgService } from './process-htt-pmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http:HttpClient, private processHttpService:ProcessHttPMsgService) { }

  getDishes(): Observable<Dish[]> {
    console.log(baseURL + 'dishes');
    return this.http.get<Dish[]>(baseURL + 'dishes').pipe(catchError(this.processHttpService.handleError));
  }

  getDish(id:string):Observable<Dish>{
    return this.http.get<Dish>(baseURL+'dishes/'+id).pipe(catchError(this.processHttpService.handleError));
  }

  getFeaturedDish():Observable<Dish>{
    return this.http.get<Dish>(baseURL+'dishes?featured=true').pipe(map(dishes => dishes[0])).pipe(catchError(this.processHttpService.handleError)); //check here
  }

  getDishIds():Observable<string[] | any>{
    return this.getDishes().pipe(map(dishes=>dishes.map(dish=>dish.id))).pipe(catchError(error=>error));
  }
  
}

// constructor() { }

// getDishes(): Observable<Dish[]> {
//   return of(DISHES).pipe(delay(2000));
//   // return new Promise((resolve,error)=>{
//   //   setTimeout(()=>resolve(DISHES), 2000);
//   // });
// }

// getDish(id:string):Observable<Dish>{
//   return of(DISHES.filter((dish)=>dish.id===id)[0]).pipe(delay(2000));
//   // return new Promise((resolve,error)=>{
//   //   setTimeout(()=>resolve(DISHES.filter((dish)=>dish.id===id)[0]), 2000);
//   // });
  
// }

// getFeaturedDish():Observable<Dish>{
//   return of(DISHES.filter((dish)=>dish.featured)[0]).pipe(delay(2000));
//   // return new Promise((resolve,error)=>{
//   //   setTimeout(()=>resolve(DISHES.filter((dish)=>dish.featured)[0]), 2000);
//   // });
// }

// getDishIds():Observable<string[] | any>{
//   return of(DISHES.map(dish=> dish.id));
// }
