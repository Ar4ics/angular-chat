import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf
} from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UploadService } from './upload/upload.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [AuthService, UploadService]
})
export class CoreModule {
  // Prevent reimport of this module
  constructor(
    @Optional()
    @SkipSelf()
    currentModule: CoreModule
  ) {
    if (currentModule) {
      throw new Error(
        'CoreModule is already loaded. Add it to the Imports array of the AppModule only'
      );
    }
  }
}
