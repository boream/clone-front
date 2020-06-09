import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';
import { Subscription } from 'rxjs';
import { ToasterService } from '../../../notifications/services/toaster.service';

@Component({
  selector: 'app-close-account',
  templateUrl: './close-account.component.html',
  styleUrls: ['./close-account.component.scss']
})
export class CloseAccountComponent implements OnInit, OnDestroy {

  formDeleteAccount: FormGroup;

  user: User;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toasters: ToasterService
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    debugger
    this.subscriptions.push(
      this.userService.getLoggedUser().subscribe((res) => {
        debugger
        this.user = res;
        debugger
      }));
    this.formDeleteAccount = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  submit(form) {
    debugger
    this.subscriptions.push(
      this.userService.closeAccount(this.user).subscribe(
        () => {
          debugger
          this.toasters.success('Account deleted succesfully.', { autoClose: false })
        },
        (error) => {
          // this.toasters.error(
          //   'Password given is not the correct one.',
          //   { fade: true }
          // )
          console.log(error)
        }
      )
    )
  }

  passwordHasError(password) {
    if (password.touched || password.dirty) {
      return password.errors?.minlength || password.errors?.required;
    }
  }


}

