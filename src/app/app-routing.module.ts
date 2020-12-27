import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminuserComponent } from './adminuser/adminuser.component';
import { LoginComponent } from './login/login.component';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'adminuser', component: AdminuserComponent},
  // { path: 'student', component: StudentComponent},
  { path: 'student', component: MainViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
