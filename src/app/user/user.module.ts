import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [UserComponent]
})
export class UserModule { }
