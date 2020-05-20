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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.formSignUp = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      surname: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, ]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
      //passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }
  // Validators.pattern(this.emailPattern)
}
