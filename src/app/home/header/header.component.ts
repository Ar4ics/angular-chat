import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, public router: Router) {}

  ngOnInit() {}

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['user/login']);
    });
  }
}
