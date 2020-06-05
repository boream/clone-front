import { Injectable, Injector, ComponentFactoryResolver, ApplicationRef, ComponentRef, Type, Optional, Inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Toaster, ToasterType } from '../model/toaster';
import { filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ToasterService {

    private subject = new Subject<Toaster>();

    private defaultId = 'default-alert';

    private compRef: ComponentRef<any>;

    constructor(
        private injector: Injector,
        private resolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        @Optional() @Inject(DOCUMENT) private _document: any,
    ) {

    }

    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Toaster> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    success(message: string, options?: any) {
        this.alert(new Toaster({ ...options, type: ToasterType.Success, message }));
    }

    error(message: string, options?: any) {
        this.alert(new Toaster({ ...options, type: ToasterType.Error, message }));
    }

    info(message: string, options?: any) {
        this.alert(new Toaster({ ...options, type: ToasterType.Info, message }));
    }

    warn(message: string, options?: any) {
        this.alert(new Toaster({ ...options, type: ToasterType.Warning, message }));
    }

    // main alert method    
    alert(toaster: Toaster) {
        toaster.id = toaster.id || this.defaultId;
        this.subject.next(toaster);
    }

    // clear alerts
    clear(id = this.defaultId) {
        this.subject.next(new Toaster({ id }));
    }

    // TODO explore provider factory...
    injectComponent<T>(component: Type<T>) {
        if (!this.compRef) {
            const compFactory = this.resolver.resolveComponentFactory(component);
            this.compRef = compFactory.create(this.injector);
            this.appRef.attachView(this.compRef.hostView);
            this._document.body.prepend(this.compRef.location.nativeElement);
        }
    }

}
