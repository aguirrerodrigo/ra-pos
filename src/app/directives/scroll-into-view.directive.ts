import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
	selector: '[appScrollIntoView]'
})
export class ScrollIntoViewDirective {
	private _scroll = false;

	get scroll(): boolean {
		return this._scroll;
	}

	@Input('appScrollIntoView') set scroll(value: boolean) {
		this._scroll = value;
		if (this._scroll) {
			const elem = this.el.nativeElement;
			elem.scrollIntoView(false);
		}
	}

	constructor(private el: ElementRef) {}
}
