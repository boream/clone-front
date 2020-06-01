import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  formChangePswd: FormGroup;

  emailPattern: any =
    /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

  charactersPattern: any = /A-Za-z0-9\-\_]+/;

  error: boolean;

  user: User;

  loading = false;
  success = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService
    ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(this.userService.getLoggedUser().subscribe((res) => {
      this.user = res;
    }));

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
    debugger
    this.subscriptions.push(this.userService.changePassword(this.user, form.value.newPassword).subscribe(
      () => {
        this.success = true;
      }, (error) => {
        console.log(error)
      }
    ));
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

  successClose() {
    this.success = false;
  }
}
