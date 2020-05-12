import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
   selector: 'input[appAutoType]'
})
export class AutoTypeDirective {
   constructor(private el: ElementRef) {}

   @HostListener('window:keydown', ['$event'])
   onWindowKeyDown(e: KeyboardEvent) {
      if (e.srcElement == this.el.nativeElement) {
         return;
      }

      let elem = this.el.nativeElement as HTMLInputElement;
      elem.focus();
   }
}
