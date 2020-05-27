import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-close-account',
  templateUrl: './close-account.component.html',
  styleUrls: ['./close-account.component.scss']
})
export class CloseAccountComponent implements OnInit {

  formDeleteAccount: FormGroup;
  error: boolean;

  constructor(private fb: FormBuilder, private auth: AuthService) {

  }

  ngOnInit(): void {
    this.formDeleteAccount = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  submit(form) {

  }

  passwordHasError(password) {
    if (password.touched || password.dirty) {
      return password.errors?.minlength || password.errors?.required;
    }
  }

  errorClose() {
    this.error = null;
  }

}

