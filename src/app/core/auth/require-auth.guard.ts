import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class RequireAuthGuard implements CanActivate, CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  isLogined(event: string) {
    return this.auth.authenticated$.take(1).do(authenticated => {
      console.log(`RequireAuthGuard@${event}, authenticated: ${authenticated}`);
      if (!authenticated) {
        this.router.navigate(['user/login']);
      }
    });
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.isLogined('canLoad');
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.isLogined('canActivate');
  }
}
