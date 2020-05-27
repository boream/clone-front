import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  emailPattern: any =
    /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  showErrorMessage: string;

  showSuccessMessage: string;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      identifier: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  emailHasError(form) {
    if (form.controls.identifier.touched || form.controls.identifier.dirty) {
      return form.controls.identifier.errors?.pattern || form.controls.identifier.errors?.required;
    }
  }

  passwordHasError(form) {
    if (form.controls.password.touched || form.controls.password.dirty) {
      return form.controls.password.errors?.minlength || form.controls.password.errors?.required;
    }
  }

  submit(form) {
    this.auth.login(form).subscribe(
      (res) => {
        this.router.navigate(['/home'])
      }, (error) => {
        this.showErrorMessage = error.error.message[0].messages[0].message;
      }
    )
  }

  errorClose() {
    this.showErrorMessage= null;
  }


  successClose() {
    this.showSuccessMessage= null;
  }


}
