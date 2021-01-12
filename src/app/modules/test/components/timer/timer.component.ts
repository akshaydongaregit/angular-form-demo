import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';
import { AbstractValueAccessor, MakeProvider } from 'src/app/shared/abstract-value-accessor';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  providers: [
    MakeProvider(TimerComponent)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent extends AbstractValueAccessor {

  @Input() time:string;

  @Output()
  end = new EventEmitter<any>();

  startTime:Date;

  _hours;
  _mins;
  _secs;

  initialTime = () => {
      return Number.parseFloat(this.time) / 60;
  };

  constructor() {
    super();
    this.startTimer();
  }

  ngOnInit(): void {

    $("#sidenavToggler").click(function (e) {
      e.preventDefault();
      $(".content-wrapper").toggleClass("sidenav-toggled");
    });
  }

  startTimer(){
    this.startTime = new Date();
    let intervalId = setInterval( () => { this.updateTime(intervalId); } , 3000);
  }

  getRemainingTime(){
    if(this.time) {
      try {
        let currentTime:Date = new Date();
        let passedTime = currentTime.getTime() - this.startTime.getTime();
        passedTime /= 1000;
        let remainingTime = (Number.parseInt(this.time) * 60 ) - passedTime; 
        if(remainingTime<=0)
          return 0;
        else
          return remainingTime/60;

      }catch(e){
        return 0;
      }
    }
  }
  getPassedTime(){
    if(this.time) {
      try {
        let currentTime:Date = new Date();
        let passedTime = currentTime.getTime() - this.startTime.getTime();
        passedTime /= 1000;
        if(passedTime<=0)
          return 0;
        else
          return passedTime/60;

      }catch(e){
        return 0;
      }
    }
  }

  updateTime(interval) {
    if(!this.time)
      clearInterval(interval);
    
    try {
      let currentTime:Date = new Date();
      let passedTime = currentTime.getTime() - this.startTime.getTime();
      passedTime /= 1000;
      let remainingTime = (Number.parseInt(this.time) * 60 ) - passedTime; 
      if(remainingTime<=0) { 
        clearInterval(interval);
        this.end.emit({remainingTime:0});
      } else { 
        this._hours = Math.floor( remainingTime / 3600);
        this._mins = Math.floor( (remainingTime % 3600) / 60);
        this._secs = Math.floor( remainingTime % 60 );
        $('#hours').text(this._hours);
        $('#mins').text(this._mins);
        $('#secs').text(this._secs);
      }
    } catch(e) {
      clearInterval(interval);
      console.log(e);
    }
  }
}
