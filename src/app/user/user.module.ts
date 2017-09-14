import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [UserRoutingModule, SharedModule],
  declarations: [LoginComponent, SignupComponent],
  providers: []
})
export class UserModule {}
