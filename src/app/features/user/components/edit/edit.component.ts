import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToasterService } from '../../../notifications/services/toaster.service';

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

  error: String;

  user: User;

  userAvatar: String | ArrayBuffer;

  newAvatar: any;

  loading = false;
  success = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toasters: ToasterService
  ) { }

  ngOnInit(): void {
    this.userAvatar = '/assets/icons/user.svg';
    this.error = null;
    this.formEditProfile = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(4)]],
      lastname: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      username: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.userService.getLoggedUser().subscribe((res) => {
      this.user = Object.assign({}, {
        id: res.id,
        username: res.username,
        email: res.email,
        firstname: res.firstname,
        lastname: res.lastname
      });
      if (res.profile) {
        this.userAvatar = `${environment.apiUrl}${res.profile.url.slice(1)}`;
      }
      this.formEditProfile.setValue({
        firstname: this.user.firstname || '',
        lastname: this.user.lastname || '',
        email: this.user.email || '',
        username: this.user.username || ''
      });
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  submit(form) {
    const updatedUser = Object.assign({}, this.user, form.value);
    this.subscriptions.push(
      this.userService.updateUser(updatedUser, this.newAvatar).subscribe(
        () => {
          this.toasters.success('Profile succesfully edited.', { autoClose: false })
        },
        () => {
          this.toasters.error(
            'There was an error updating the profile.',
            { fade: true }
          )
        }
      )
    );
  }

  firstNameHasError(form) {
    if (form.controls.firstname?.touched || form.controls.firstname?.dirty) {
      return form.controls.firstname.errors?.minlength || form.controls.firstname.errors?.required;
    }
  }

  lastNameHasError(form) {
    if (form.controls.lastname?.touched || form.controls.lastname?.dirty) {
      return form.controls.lastname.errors?.minlength || form.controls.lastname.errors?.required;
    }
  }

  emailHasError(form) {
    if (form.controls.email?.touched || form.controls.email?.dirty) {
      return form.controls.email.errors?.pattern || form.controls.email?.errors?.required;
    }
  }

  userNameHasError(form) {
    if (form.controls.username.touched || form.controls.username.dirty) {
      return form.controls.username.errors?.pattern || form.controls.username.errors?.required || form.controls.username.errors?.minlength;
    }
  }

  changeAvatar(file: File): void {
    const reader = new FileReader();
    this.newAvatar = file;
    reader.onload = e => {
      this.userAvatar = reader.result
    };
    reader.readAsDataURL(file);
  }

}
