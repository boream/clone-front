import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
import { Toaster, ToasterType } from '../../model/toaster';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit, OnDestroy {

  @Input() id = 'default-alert';
  @Input() fade = true;

  toasters: Toaster[] = [];
  toasterSubscription: Subscription;
  routeSubscription: Subscription;

  constructor(private router: Router, private toasterService: ToasterService, private _changeDetectionRef : ChangeDetectorRef) {

   }

  ngOnInit(): void {

    this.toasterSubscription = this.toasterService.onAlert(this.id)
      .subscribe(alert => {
        // clear alerts when an empty alert is received
        if (!alert.message) {
          // filter out alerts without 'keepAfterRouteChange' flag
          this.toasters = this.toasters.filter(x => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          this.toasters.forEach(x => delete x.keepAfterRouteChange);
          return;
        }

        // add alert to array
        this.toasters.push(alert);
        this._changeDetectionRef.detectChanges();
        // auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      });

    // clear alerts on location change
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.toasterService.clear(this.id);
      }
    });
  }

  removeAlert(toaster: Toaster) {
    // check if already removed to prevent error on auto close
    if (!this.toasters.includes(toaster)) return;

    if (this.fade) {
      // fade out alert
      this.toasters.find(x => x === toaster).fade = true;

      // remove alert after faded out
      setTimeout(() => {
        this.toasters = this.toasters.filter(x => x !== toaster);
      }, 250);
    } else {
      // remove alert
      this.toasters = this.toasters.filter(x => x !== toaster);
    }
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.toasterSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  cssClass(toaster: Toaster) {
    if (!toaster) return;

    const classes = ['alert', 'alert-dismissable'];

    const toasterTypeClass = {
      [ToasterType.Success]: 'alert alert-success',
      [ToasterType.Error]: 'alert alert-danger',
      [ToasterType.Info]: 'alert alert-info',
      [ToasterType.Warning]: 'alert alert-warning'
    }

    classes.push(toasterTypeClass[toaster.type]);

    if (toaster.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }

}
