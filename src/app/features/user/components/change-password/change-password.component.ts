import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  formChangePswd: FormGroup;

  emailPattern: any =
    /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

  charactersPattern: any = /A-Za-z0-9\-\_]+/;

  error: boolean;

  constructor(private fb: FormBuilder, private auth: AuthService) {

  }

  ngOnInit(): void {

    this.formChangePswd = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },
      {
        validator: this.matchPassword('newPassword', 'confirmPassword'),
      }
    );
  }

  submit(form) {

  }

  passwordHasError(password) {
    if (password.touched || password.dirty) {
      return password.errors?.minlength || password.errors?.required;
    }
  }

  confirmPasswordHasError(confirmPassword) {
    if (confirmPassword.touched || confirmPassword.dirty) {
      return confirmPassword.errors?.passwordMismatch && confirmPassword.invalid;
    }
  }

  matchPassword(newPassword: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const newPassword = formGroup.controls.newPassword;
      const confirmPassword = formGroup.controls.confirmPassword;

      if (!newPassword || !confirmPassword) {
        return null;
      }

      if (confirmPassword.errors && !confirmPassword.errors.passwordMismatch) {
        return null;
      }

      if (newPassword.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    }
  }

  errorClose() {
    this.error = null;
  }
}
