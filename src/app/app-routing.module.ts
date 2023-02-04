import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLoggedComponent } from './pages/home-logged/home-logged.component';
import { HomeComponent } from './pages/home/home.component';
import { NewUserComponent } from './pages/new-user/new-user.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeLoggedComponent},
  {path: 'new-user', component: NewUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
