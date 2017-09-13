import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';

import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageItemComponent } from './message-item/message-item.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { MessageService } from './message/message.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MessageContainerComponent } from './message-container/message-container.component';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [HomeRoutingModule, SharedModule],
  declarations: [
    HomeComponent,
    HeaderComponent,
    MessageListComponent,
    MessageItemComponent,
    MessageFormComponent,
    UserProfileComponent,
    MessageContainerComponent
  ],
  providers: [MessageService]
})
export class HomeModule {}
