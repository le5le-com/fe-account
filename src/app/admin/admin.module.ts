import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminUsersComponent } from './users/users.component';

@NgModule({
  imports: [SharedModule, AdminRoutingModule],
  declarations: [AdminComponent, AdminUsersComponent]
})
export class AdminModule {}
