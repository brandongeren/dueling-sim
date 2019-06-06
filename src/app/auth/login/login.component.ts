import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  // TODO: login using username instead of email
  email: string;
  password: string;

  ngOnInit() {
  }

  login(): void {
    this.authService.login(this.email, this.password)
    .subscribe(data => {
      this.router.navigate(['']);
    })
  }

}
