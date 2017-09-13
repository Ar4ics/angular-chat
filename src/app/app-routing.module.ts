
import { NgModule } from '@angular/core';
import {
  CanActivate,
  PreloadAllModules,
  RouterModule,
  Routes
} from '@angular/router';
import { RequireUnauthGuard } from './core/auth/require-unauth.guard';
import { RequireAuthGuard } from './core/auth/require-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/login',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: 'app/user/user.module#UserModule',
    canLoad: [RequireUnauthGuard]
  },
  {
    path: 'home',
    loadChildren: 'app/home/home.module#HomeModule',
    canLoad: [RequireAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [RequireAuthGuard, RequireUnauthGuard]
})
export class AppRoutingModule {}
