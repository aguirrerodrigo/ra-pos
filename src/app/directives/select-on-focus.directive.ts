import { Directive, ElementRef } from '@angular/core';

@Directive({
	selector: '[appSelectOnFocus]'
})
export class SelectOnFocusDirective {
	constructor(private el: ElementRef) {
		this.el.nativeElement.addEventListener('focus', () => {
			this.select();
		});
	}

	private select() {
		setTimeout(() => this.el.nativeElement.select());
	}
}
