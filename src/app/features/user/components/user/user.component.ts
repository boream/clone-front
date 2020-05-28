import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public featuredImages:String[]


  constructor(
    private userService: UserService,
    // private route: ActivatedRouteSnapshot,
    // private router: Router
  ) { }

  userName: string = '';

  ngOnInit(): void {
    this.userService.getLoggedUserImages().subscribe((res) => {
      debugger
      this.featuredImages = [res[0].file[0].url];
      console.log([res[0].file[0].url]);
    })
  }


}
