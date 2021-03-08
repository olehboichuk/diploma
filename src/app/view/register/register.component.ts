import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {IRegisterModel} from '../../models/auth.model';
import {ToastrService} from 'ngx-toastr';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  public loading = false;
  public password: string;
  matcher = new MyErrorStateMatcher();
  public hidePassword = true;
  public hideConfirm = true;
  public error = '';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      login: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  public onSubmit(): void {
    const user = {
      login: this.registerForm.get('login').value,
      password: this.registerForm.get('password').value,
      first_name: this.registerForm.get('first_name').value,
      last_name: this.registerForm.get('last_name').value,
    } as IRegisterModel;
    this.loading = true;
    this.registerForm.controls.login.disable();
    this.registerForm.controls.first_name.disable();
    this.registerForm.controls.last_name.disable();
    this.registerForm.controls.password.disable();
    this.registerForm.controls.confirmPassword.disable();
    this.authService.register(user)
      .subscribe(data => {
          this.router.navigate(['/login']);
        },
        error => {
          if (error.error.message) {
            this.toastr.error(error.error.message, 'ERROR!');
          } else {
            this.toastr.error('No Internet connection', 'ERROR!');
          }
          this.loading = false;
          this.registerForm.controls.login.enable();
          this.registerForm.controls.first_name.enable();
          this.registerForm.controls.last_name.enable();
          this.registerForm.controls.password.enable();
          this.registerForm.controls.confirmPassword.enable();
        });
  }
}


export function MustMatch(controlName: string, matchingControlName: string): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({mustMatch: true});
    } else {
      matchingControl.setErrors(null);
    }
  };
}
