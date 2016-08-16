import { Component, OnInit } from '@angular/core';
import { AuthService, AuthData } from '../auth/auth.service';
import { HTTP_PROVIDERS } from '@angular/http';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [AuthService, HTTP_PROVIDERS],
})
export class LoginComponent implements OnInit {
  private jwt: string;
  private data: AuthData;

  public username: string;
  public password: string;

  constructor(private authService: AuthService) {}
  ngOnInit() {}

  login() {
    // var _this: any = this;
    this.authService.login(this.username, this.password)
    .subscribe(
      (res) => {
        this.data = res;
        this.jwt = this.data.jwt;
        localStorage.setItem('jwt', this.data.jwt);
      },
      (err) => console.log(err)
    );
  }

  logout() {
    this.jwt = null;
    localStorage.removeItem('jwt');
  }

}
