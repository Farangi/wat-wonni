import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl  } from '@angular/forms';
import { AuthService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(public authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
      this.createForm();
    }

  ngOnInit() {
  }

  createForm() {

    this.registerForm = this.fb.group({
      // tslint:disable-next-line:max-line-length
      fullName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
      // tslint:disable-next-line:max-line-length
      password: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/), Validators.minLength(6), Validators.maxLength(100)])],
      // tslint:disable-next-line:max-line-length
      confirmPassword: ['', Validators.compose([ Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/), Validators.minLength(6), Validators.maxLength(100)])],
      accountType: ['', Validators.compose([Validators.required])]
    }, {validators: this.checkPasswords });
  }

  private validateForm(form) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  tryRegister(value) {
    console.log(value);
    if (this.registerForm.valid) {
      this.authService.doRegister(value)
        .then(res => {
          this.router.navigate(['/home']);
        }, err => {
          console.log(err);
        });
    } else {
      this.validateForm(this.registerForm);
    }
  }
}
