import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';
import { UserProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [SharedModule, UserRoutingModule],
  declarations: [UserComponent, UserProfileComponent]
})
export class UserModule {}
