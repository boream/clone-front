import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formSignUp: FormGroup;

  emailPattern: any =
  /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

  charactersPattern: any = /A-Za-z0-9\-\_]+/;


  subscriptions: Subscription[] = [];
  error: boolean;

  constructor(private fb: FormBuilder, private auth: AuthService) {

  }

  ngOnInit(): void {

    this.formSignUp = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(4)]],
      lastname: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  submit(form) {
    this.auth.signup(form.value).subscribe((response) => {
      debugger
    },(error) => {
      this.error = error.error.message[0].messages[0].message;
    });
  }

  firstNameHasError(form) {
    if (form.controls.firstname?.touched)  {
      return form.controls.firstname.errors?.minlength || form.controls.firstname.errors?.required;
    }
  }

  lastNameHasError(form) {
    if (form.controls.lastname?.touched ||  form.controls.lastname?.dirty)  {
      return form.controls.lastname.errors?.minlength || form.controls.lastname.errors?.required;
    }
  }

  emailHasError(form) {
    if (form.controls.email?.touched  || form.controls.email?.dirty)  {
      return form.controls.email.errors?.pattern || form.controls.email?.errors?.required;
    }
  }

  userNameHasError(form) {
    if (form.controls.username.touched  || form.controls.username.dirty)  {
      return form.controls.username.errors?.pattern || form.controls.username.errors?.required || form.controls.username.errors?.minlength;
    }
  }

  passwordHasError(form) {
    if (form.controls.password.touched ||  form.controls.password.dirty)  {
      return form.controls.password.errors?.minlength || form.controls.password.errors?.required;
    }
  }

  errorClose() {
    this.error= null;
  }


}
