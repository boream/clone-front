import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  formEditProfile: FormGroup;

  emailPattern: any =
  /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

  charactersPattern: any = /A-Za-z0-9\-\_]+/;

  error: boolean;

  user: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe(response => {
      this.user = response;
    })


    this.formEditProfile = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(4)]],
      lastname: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      username: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  firstNameHasError(form) {
    if (form.controls.firstname?.touched ||  form.controls.firstname?.dirty)  {
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

  submit(form) {
    this.userService.updateUser(this.user.id, this.user).subscribe(
        (res) => {
          this.router.navigate(['/'])
        }, (error) => {
          console.log(error)
          this.error = error.error.message[0].messages[0].message;
        }
    )
  }

  errorClose() {
    this.error= null;
  }

}
