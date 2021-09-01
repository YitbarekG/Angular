
import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective;

  feedbackForm:FormGroup;
  feedBack:Feedback;
  contactType=ContactType;

  constructor(private fb:FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.feedbackForm=this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      telnum:[0,Validators.required],
      email:['',Validators.required],
      agree:false,
      contacttype:'None',
      message:''
    });
  }

  onSubmit(){
    this.feedBack = this.feedbackForm.value;
    console.log("feedback",this.feedBack);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

}
