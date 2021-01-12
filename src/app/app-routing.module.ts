import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  
   
  {path:  "", pathMatch:  "full",redirectTo:  "home"},
  {path: "home",  loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  {path: "auth", loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  {path: "template", loadChildren: () => import('./modules/template/template.module').then(m => m.TemplateModule) },
  {path: "test", loadChildren: () => import('./modules/test/test.module').then(m => m.TestModule) },
  {path: "user", loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  {path: "admin", loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  {path: "superadmin", loadChildren: () => import('./modules/superadmin/superadmin.module').then(m => m.SuperadminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
