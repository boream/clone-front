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

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  emailHasError(form) {
    return  form.controls.identifier.errors?.email || form.controls.identifier.errors?.required;
  }

  passwordHasError(form) {
    return   form.controls.password.errors?.minlength  || form.controls.password.errors?.required;
  }

  submit(form) {
    debugger
    this.auth.login(form).subscribe(_ => this.router.navigate(['/home']))
  }

}
