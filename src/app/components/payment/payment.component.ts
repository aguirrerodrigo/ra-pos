import { Component } from '@angular/core';
import { Order } from '@app/models/order';
import { OrderService } from '@app/services/order.service';
import { CurrencyPipe } from '@angular/common';

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.scss'],
	providers: [CurrencyPipe]
})
export class PaymentComponent {
	private _cash: string;
	order: Order;
	cashValue = 0;

	get cash() {
		return this._cash;
	}

	set cash(value: string) {
		const n = Number(value);
		if (!isNaN(n)) {
			this.cashValue = n;
		}
	}

	get change(): number {
		return this.cashValue - this.order.total;
	}

	constructor(
		private orderService: OrderService,
		private currency: CurrencyPipe
	) {
		this.order = orderService.order;
		this._cash = this.format(this.cashValue);
	}

	private format(n: number) {
		return this.currency.transform(n, 'PH', 'P ', '1.2-2');
	}

	toValue(): void {
		this._cash = this.cashValue.toString();
	}

	toFormattedText(): void {
		this._cash = this.format(this.cashValue);
	}

	checkout(): void {
		this.orderService.order = new Order();
	}
}
