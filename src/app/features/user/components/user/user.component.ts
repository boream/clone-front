import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public featuredImages: Array<any> = [];

  constructor(
    // private route: ActivatedRouteSnapshot,
    // private router: Router
  ) { }

  userName: string = '';

  ngOnInit(): void {
    this.model3dService.getModels().subscribe((result) => {
      debugger
      //Ordena el resultado de los mas votados de mayor a menor y coge los 8 primeros;
      this.featuredImages = result.sort((a, b) => b.likes - a.likes).slice(0, 4);
      //Ordena el resultado de los ultimos 8 que se han subido a la base de datos;
      this.newModels = result.sort((a, b)  => b.createDate - a.createDate).slice(0, 15);
      //
      // this.fanArtModels = result.map(x => x._id == "5e823f50cbca55661229c388");
    });

  }

}
