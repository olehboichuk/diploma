import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ILoginModel} from '../../models/auth.model';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public error = '';
  public loading = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public onSubmit(): void {
    const user = {
      login: this.loginForm.get('login').value,
      password: this.loginForm.get('password').value
    } as ILoginModel;
    this.loading = true;
    this.loginForm.controls.login.disable();
    this.loginForm.controls.password.disable();
    this.authService.login(user)
      .subscribe(data => {
          if (data.active) {
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('login', data.login);
            this.router.navigate(['/my-files']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error => {
          if (error.error.message) {
            this.error = error.error.message;
          } else {
            this.error = 'No Internet connection';
          }
          this.loading = false;
          this.loginForm.controls.login.enable();
          this.loginForm.controls.password.enable();
        });
  }
}
