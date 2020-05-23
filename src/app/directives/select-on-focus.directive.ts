import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
	selector: '[appSelectOnFocus]'
})
export class SelectOnFocusDirective {
	private focus;
	@Input('appSelectOnFocus') delay:
		| 'delay-off'
		| 'delay-first-time'
		| 'delay-always' = 'delay-off';

	get ref(): any {
		return this.el as any;
	}

	constructor(private el: ElementRef) {
		this.el.nativeElement.addEventListener('focus', () => {
			this.select();
		});
	}

	@HostListener('focus') private onFocus(): void {
		this.focus = true;
	}

	@HostListener('focusout') private onFocusOut(): void {
		this.focus = false;
	}

	private select(): void {
		this.ref.selectCount = this.ref.selectCount || 0;

		switch (this.delay) {
			case 'delay-first-time':
				if (this.ref.selectCount === 0) {
					setTimeout(() => this.selectElem());
				}
				break;
			case 'delay-always':
				setTimeout(() => this.selectElem());
				break;
			default:
				this.selectElem();
		}

		this.ref.selectCount++;
	}

	private selectElem(): void {
		if (this.focus) {
			this.el.nativeElement.select();
		}
	}
}
