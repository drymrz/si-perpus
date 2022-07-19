import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public afa: AngularFireAuth) {}

  async signIn(email: string, pass: string) {
    await this.afa.signInWithEmailAndPassword(email, pass).then((res) => {
      sessionStorage.setItem('user', JSON.stringify(res.user));
    });
  }

  get logStatus() {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  logOut() {
    sessionStorage.removeItem('user');
    this.afa.signOut();
  }
}
