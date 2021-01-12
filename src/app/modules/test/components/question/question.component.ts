import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input()
  state:any;

  @Output()
  saveAndNext = new EventEmitter<any>();

  @Output()
  openPrev = new EventEmitter<any>();

  @Output()
  submit = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  saveAndOpenNextQuestion(){
    this.saveAndNext.emit();
  }

  openPrevQuestion(){
    this.openPrev.emit();
  }

  submitTest(){
    this.submit.emit();
  }
}
