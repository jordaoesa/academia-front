import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './components/users/users.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {AuthGuard} from './core/guard/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: SidebarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
