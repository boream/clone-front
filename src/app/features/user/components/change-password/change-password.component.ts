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
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit(form) {
    this.auth.signup(form.value).subscribe((response) => {

    },(error) => {
      this.error = error.error.message[0].messages[0].message;
    });
  }

  passwordHasError(password) {
    if (password.touched ||  password.dirty)  {
      return password.errors?.minlength || password.errors?.required;
    }
  }

  errorClose() {
    this.error= null;
  }
}
