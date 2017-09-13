import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route,
  CanLoad
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class RequireUnauthGuard implements CanActivate, CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  isLogout(event: string) {
    return this.auth.authenticated$
      .take(1)
      .do(authenticated => {
        console.log(`RequireUnauthGuard@${event}, authenticated: ${authenticated}`);
        if (authenticated) {
          this.router.navigate(['home']);
        }
      })
      .map(authenticated => !authenticated);
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.isLogout('canLoad');
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.isLogout('canActivate');
  }
}
