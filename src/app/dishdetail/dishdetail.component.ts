import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import {Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {

  @ViewChild('cform') feedbackFormDirective;

  // @Input()
  // dish: Dish;
  dish:Dish;
  dishIds:string[];
  prev:string;
  next:string;
  commentForm:FormGroup;
  comment:Comment;

  formErrors={
    'name':'',
    'comment':'',
  };

  validationMessages = {
    'name':{
      'required':'Name is required',
      'minlength':'First name must be atleast 2 characters long',
      'maxlength':'first name cannot be more than 25 characters'
    },
    
    'comment': {
      'required': 'Comment is required.',
    },
  };

  constructor(private fb:FormBuilder, private dishService:DishService, private route:ActivatedRoute, private location: Location, @Inject("BaseURL") private baseUrl) {
    this.createForm();
   }

  ngOnInit() {
    // let id = this.route.snapshot.params['id'];
    this.dishService.getDishIds().subscribe((dishIds)=>this.dishIds=dishIds);
    this.route.params.pipe(switchMap((params:Params)=>this.dishService.getDish(params['id']))).subscribe(dish=>{this.dish=dish;this.setPrevNext(dish.id)});
    // this.dishService.getDish(id).subscribe((dish)=>this.dish=dish);
    // console.log(this.dish);
  }

  setPrevNext(dishId:string){
    const index= this.dishIds.indexOf(dishId);
    this.prev=this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next=this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack():void{
    this.location.back();
  }

  createForm(){
    this.commentForm=this.fb.group({
      name:["", [Validators.required, Validators.minLength(2)]],
      rate:[5],
      comment:["", Validators.required]
    });

    this.commentForm.valueChanges.subscribe(data=>this.onValueChange());
  }

  onValueChange(){
    if (!this.commentForm) { return; }
    console.log("chaged");
    const form =this.commentForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field]="";
        console.log("-->", this.formErrors[field]);

        const control=form.get(field);

        if(control && control.dirty && !control.valid){
         // console.log("error", control.errors, field);
          const messages = this.validationMessages[field];
          console.log("==>",messages);
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              console.log("------------------");
              this.formErrors[field] +=messages[key] ;
              console.log(this.formErrors[field]);
            }
          }
        }
      }
    }
    
  }


  onSubmit(){
    const date1 = new Date();
    this.comment ={
    rating : this.commentForm.value.rate,
    comment: this.commentForm.value.comment,
    author: this.commentForm.value.name,
    date: date1.toISOString()
    } 
    this.dish.comments.push(this.comment);
    this.feedbackFormDirective.resetForm();
    
  }


}
