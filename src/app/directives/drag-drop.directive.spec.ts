import { DragDropDirective } from './drag-drop.directive';
import { DomSanitizer } from '@angular/platform-browser';
describe('DragDropDirective', () => {
  let sanitizerSpy: { bypassSecurityTrustUrl: jasmine.Spy };
  beforeEach(() => {
    sanitizerSpy = jasmine.createSpyObj('DOMSanitizer', ['bypassSecurityTrustUrl']);
  });
  it('should create an instance', () => {
    const directive = new DragDropDirective(<DomSanitizer> <unknown>sanitizerSpy);
    sanitizerSpy.bypassSecurityTrustUrl.and.returnValue('hola');    
    expect(directive).toBeTruthy();
  });
});
