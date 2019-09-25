import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { UserProfileComponent } from './profile/profile.component';

const userRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [{ path: 'profile', component: UserProfileComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
