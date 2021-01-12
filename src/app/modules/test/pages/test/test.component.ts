import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Answer } from 'src/app/shared/models/answer';
import { Result } from 'src/app/shared/models/result';
import { SessionService } from 'src/app/shared/services/session.service';
import { TestService } from 'src/app/shared/services/test.service';
import Swal from 'sweetalert2';
import { TimerComponent } from '../../components/timer/timer.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  @ViewChild(TimerComponent) timer: TimerComponent;

  data;
  state: any = {
    question: null,
    solved: 0,
    questionIndex: 0,
    submitStatus: false,
    remainingTime: '',
  };

  app_state: any;

  username: string = '';

  constructor(private ts: TestService, private router: Router, private session: SessionService) {

  }

  ngOnInit(): void {

    this.adjustQuestionsInfoCard();

    $(window).on('resize', this.adjustQuestionsInfoCard);

    //init data
    this.app_state = this.session.state(undefined);
    this.data = this.app_state.template;
    console.log(this.app_state);
    this.state.question = this.data.questions[0];
    this.state.question.selected = true;
    this.state.questionsCount = this.data.questions.length;

    this.session.currentUserName.subscribe(val => {
      this.username = val;
    });
  }


  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    $event.preventDefault();
    $event.returnValue = false; 
  }

  adjustQuestionsInfoCard() {
    if ($(window).width() > 768) {
      $('#questions-sheet-card').addClass('show');
    } else {
      $('#questions-sheet-card').removeClass('show');
    }
  }

  saveAndOpenNextQuestion() {

    if (this.state.question.answer) {
      this.saveAnswer(this.state.question.answer);
      if (!this.state.question.solved)
        this.state.solved++;
      this.state.question.solved = true;
    }

    if (this.state.solved == this.data.questions.length) {
      $('#submit-test-btn').attr('disabled', false);
      //Swal.fire('All questions has been solved, Please submit.');
    } else
      this.openQuestion(this.state.questionIndex + 1);

  }
  saveAndOpenQuestion(i: number) {

    if (this.state.question.answer) {
      this.saveAnswer(this.state.question.answer);
      if(!this.state.question.solved)
      {
      this.state.solved++;
      }
      this.state.question.solved = true;
    }

    this.openQuestion(i);

  }

  openQuestion(i: number) {

    if (i < this.data.questions.length && i >= 0) {
      this.state.question.selected = false;
      this.state.questionIndex = i;
      this.state.question = this.data.questions[i];
      this.state.question.selected = true;

    }

  }

  openPrevQuestion() {
    this.openQuestion(this.state.questionIndex - 1);
  }

  submitTest(event) {

    let result: Result = new Result();
    result.templateId = this.app_state.answer.templateId;
    result.userId = this.app_state.answer.userId;
    if (event) {
      result.isSubmitted = false;
      result.timeTaken = this.data.time;
    } else {
      result.isSubmitted = true;
      result.timeTaken = '' + this.timer.getPassedTime();
    }

    this.ts.submitTest(result).subscribe((res: Result) => {
      console.log(result);
      this.router.navigate(['/']);
      Swal.fire({
        html: result.isSubmitted ? `<strong>Test has been submitted Successfully!</strong><br/>
        Please check with system administrator for result.` : `<strong>Test has been submitted because of timed out!</strong><br/>
        Please check with system administrator for result.`,
        icon: 'success',
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: true,
        focusConfirm: true,
      });

    }, err => {
      console.log(err);
    });

  }

  saveAnswer(answerVal) {

    let answer = new Answer();
    answer.answer = answerVal;
    answer.answerId = this.app_state.answer.answerId;
    answer.userId = this.app_state.answer.userId;
    answer.questionNo = this.state.question.templateQuestionNo;
    answer.templateId = this.app_state.answer.templateId;

    this.ts.saveAnswer(answer).subscribe(res => {
      console.log(res);
    });

  }

}
