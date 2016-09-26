import { Component, OnInit } from '@angular/core';
import { AuthService, AuthData } from '../auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.pug',
  styleUrls: ['login.component.scss'],
  providers: [AuthService],
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
