import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-close-account',
  templateUrl: './close-account.component.html',
  styleUrls: ['./close-account.component.scss']
})
export class CloseAccountComponent implements OnInit, OnDestroy {

  formDeleteAccount: FormGroup;
  error: String;
  user: User;

  loading = false;
  success = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.getLoggedUser().subscribe((res) => {
        this.user = res;
      }));
    this.formDeleteAccount = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  submit(form) {
    this.subscriptions.push(
      this.userService.closeAccount(this.user).subscribe(() => {
        console.log('Delete successfully')
      })
    )
  }

  passwordHasError(password) {
    if (password.touched || password.dirty) {
      return password.errors?.minlength || password.errors?.required;
    }
  }

  errorClose() {
    this.error = null;
  }

  successClose() {
    this.success = false;
  }

}

