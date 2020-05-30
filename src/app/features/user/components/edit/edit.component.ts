import { Component, OnInit, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription} from 'rxjs';

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

  loading = false;
  success = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.formEditProfile = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(4)]],
      lastname: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      username: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.userService.getLoggedUser().subscribe((res) => {
      this.user = res;
      console.log(res)
      this.formEditProfile.setValue({
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        username: this.user.username
      });
    })
  }

  submit(form) {
    this.loading = true;
    const formValue = this.formEditProfile.value;
    this.userService.updateUser(this.user.id, formValue).subscribe(
      (res) => {
        this.success = true;
      }, (error) => {
        console.log(error)
      }
    )
    this.loading = false;
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

  errorClose() {
    this.error= false;
  }

  successClose() {
    this.success = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
