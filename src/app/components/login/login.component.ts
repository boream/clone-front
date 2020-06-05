import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterService } from 'src/app/features/notifications/services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  formLogin: FormGroup;
  emailPattern: any =
    /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  showErrorMessage: string;

  subscriptions: Subscription[] = [];
  showSignupSuccess = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toasters: ToasterService
  ) {  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
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
      () => {
        this.router.navigate(['/home'])
      }, (error) => {
        this.toasters.error(error.error.message[0].messages[0].message);
      }
    )
  }
}
