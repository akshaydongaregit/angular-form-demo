import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartTestComponent } from './pages/start/start-test.component';
import { TestComponent } from './pages/test/test.component';
import { LoggedinuserComponent } from '../../loggedinuser/loggedinuser.component';


const routes: Routes = [
  {
    path: "",
    component: LoggedinuserComponent,
    children: [


      { path: "", pathMatch: "full", redirectTo: "dashboard" },
      { path: "start", component: StartTestComponent },
    ]
  },
  {
    path: "",
    children: [
      { path: "give", component: TestComponent },
    ]
  }
];

/*const routes: Routes = [
  { path:  "", pathMatch:  "full",redirectTo:  "login"},
  { path:"start",component:StartTestComponent  },
  { path:"give",component:TestComponent  }
];*/

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
