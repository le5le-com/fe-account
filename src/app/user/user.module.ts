import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { VipPipe } from './user.pipe';

@NgModule({
  imports: [SharedModule, UserRoutingModule],
  declarations: [UserComponent, VipPipe]
})
export class UserModule {}
