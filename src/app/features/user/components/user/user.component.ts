import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public featuredImages:String[]

  private imagesUrl = environment.apiUrl;

  constructor(
    private userService: UserService
  ) { }

  userName: string = '';

  ngOnInit(): void {
    this.userService.getLoggedUserImages().subscribe((res) => {
      debugger
      this.featuredImages = [res[0].file[0].url];
      console.log([res[0].file[0].url]);

      this.featuredImages = res.map(rawImage => {
        const result: any = {};
        if (rawImage && Array.isArray(rawImage.file) && rawImage.file[0]) {
          result.src = `${this.imagesUrl}${rawImage.file[0].url.slice(1)}`;
        } else {
          result.src = '';
        }
        return result;
      });
    })
  }


}
