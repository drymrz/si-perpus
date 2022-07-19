import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarLogin } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isSigned = false;
  errorState = false;
  showSpinner = false;

  userEmail;
  userPass;

  constructor(
    public auth: AuthService,
    public route: Router,
    public popup: MatSnackBar
  ) {}

  async userLogIn() {
    this.showSpinner = true;
    await this.auth
      .signIn(this.userEmail, this.userPass)
      .then((res) => {
        console.log(res);
        this.popup.openFromComponent(SnackbarLogin, {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.showSpinner = false;
        this.route.navigate([
          'home',
          {
            outlets: { content: ['datapinjaman'] },
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
        this.errorState = true;
        this.showSpinner = false;
        this.userPass = '';
      });
  }

  clearWarn() {
    this.errorState = false;
  }

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.isSigned = true;
    } else {
      this.isSigned = false;
    }
  }
}

@Component({
  selector: 'cnf-logout',
  templateUrl: './confirm.html',
  styleUrls: ['./login.component.scss'],
})
export class ConfirmLogOut {
  constructor(public route: Router, public afAuth: AuthService) {}

  logOut() {
    this.afAuth.logOut();
    this.route.navigate(['login']);
  }
}
