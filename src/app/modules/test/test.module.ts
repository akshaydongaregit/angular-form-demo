import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './pages/test/test.component';
import { StartTestComponent } from './pages/start/start-test.component';
import { TimerComponent } from './components/timer/timer.component';
import { QuestionComponent } from './components/question/question.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TestComponent, StartTestComponent, TimerComponent, QuestionComponent],
  imports: [
    CommonModule,
    TestRoutingModule,
    FormsModule
  ]
})
export class TestModule { }
