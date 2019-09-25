import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminUsersComponent } from './users/users.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [{ path: 'users', component: AdminUsersComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
