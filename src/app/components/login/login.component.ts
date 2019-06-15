import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private auth: AuthService
  ) {}

  login(): void {
    this.auth.login(this.loginForm.value)
      .then(user => {
        this.snackBar.open(`Logado como ${user['name']}`, 'Fechar', {duration: 2000});
        this.router.navigate(['home']);
      })
      .catch(err => {
        console.log(err);
        this.snackBar.open(`${err['error']['message']}`, 'Fechar', {duration: 2000});
      });
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

}
