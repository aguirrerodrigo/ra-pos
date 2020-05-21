import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: 'input[appAutoType]'
})
export class AutoTypeDirective {
	constructor(private el: ElementRef) {}

	@HostListener('window:keydown', ['$event'])
	onWindowKeyDown(e: KeyboardEvent): void {
		if (!this.isValidKey(e.key) || !this.isBody(e.target)) {
			return;
		}

		const elem = this.el.nativeElement as HTMLInputElement;
		elem.focus();
	}

	private isBody(target: any): boolean {
		return target.tagName.toLocaleLowerCase() === 'body';
	}

	private isValidKey(key: string): boolean {
		return (
			key != null &&
			key.length === 1 &&
			(this.isKeyNumber(key) || this.isKeyLetter(key))
		);
	}

	private isKeyNumber(key: string): boolean {
		return '0' <= key && key <= '9';
	}

	private isKeyLetter(key: string): boolean {
		return ('a' <= key && key <= 'z') || ('A' <= key && key < 'Z');
	}
}
