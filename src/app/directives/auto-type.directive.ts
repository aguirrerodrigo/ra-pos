import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: 'input[appAutoType]'
})
export class AutoTypeDirective {
	constructor(private el: ElementRef) {}

	@HostListener('window:keydown', ['$event'])
	onWindowKeyDown(e: KeyboardEvent) {
		if (!this.isBody(e.target)) {
			return;
		}

		const elem = this.el.nativeElement as HTMLInputElement;
		elem.focus();
	}

	isBody(target: any): boolean {
		return target.tagName.toLocaleLowerCase() === 'body';
	}
}
