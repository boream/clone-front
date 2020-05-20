import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {

    this.formSignUp = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(4)]],
      lastname: ['', [Validators.required, Validators.minLength(4)]],
      identifier: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.pattern(this.charactersPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  firstNameHasError(form) {
    if (form.controls.firstname.touched)  {
      return form.controls.firstname.errors?.minlength || form.controls.firstname.errors?.required;
    }
  }

  lastNameHasError(form) {
    if (form.controls.lastname.touched ||  form.controls.lastname.dirty)  {
      return form.controls.lastname.errors?.minlength || form.controls.lastname.errors?.required;
    }
  }

  emailHasError(form) {
    if (form.controls.identifier.touched  || form.controls.identifier.dirty)  {
      return form.controls.identifier.errors?.pattern || form.controls.identifier.errors?.required;
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



}
