import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-close-account',
  templateUrl: './close-account.component.html',
  styleUrls: ['./close-account.component.scss']
})
export class CloseAccountComponent implements OnInit {

  formDeleteAccount: FormGroup;
  error: boolean;
  user: User;

  loading = false;
  success = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    debugger
    this.userService.getLoggedUser().subscribe((res) => {
      this.user = res;
      console.log(res)
    })

    this.formDeleteAccount = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  submit(form) {
    this.userService.closeAccount(this.user).subscribe((res) => {
      console.log('Delete successfully')
    })
  }

  passwordHasError(password) {
    if (password.touched || password.dirty) {
      return password.errors?.minlength || password.errors?.required;
    }
  }

  errorClose() {
    this.error = null;
  }

}

