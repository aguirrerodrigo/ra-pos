import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-number-input',
	templateUrl: './number-input.component.html',
	styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent {
	private _value = 0;

	@Input() min = 0;
	@Input() max = 9999;

	get value(): number {
		return this._value;
	}

	@Input() set value(n: number) {
		this._value = n;
		this.valueChange.emit(this._value);
	}

	@Output() readonly valueChange = new EventEmitter<number>();

	constructor() {}

	increment(): void {
		if (this.value < this.max) {
			this.value++;
		}
	}

	decrement(): void {
		if (this.value > this.min) {
			this.value--;
		}
	}
}
