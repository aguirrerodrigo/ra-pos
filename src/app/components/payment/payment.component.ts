import { Component } from '@angular/core';
import { Order } from '@app/models/order';
import { OrderService } from '@app/services/order.service';
import { formatPhpCurrency } from '@app/utils';

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
	private _discount: string;
	private _discountInPercentage = false;
	private _cash: string;
	order: Order;
	discountValue = 0;
	cashValue = 0;

	get discount(): string {
		return this._discount;
	}

	set discount(value: string) {
		this._discountInPercentage = value.endsWith('%');
		if (this._discountInPercentage) {
			value = value.substr(value.length - 1);
		}

		const n = Number(value);
		if (!isNaN(n)) {
			this.discountValue = Math.abs(n);
		}
	}

	get afterDiscount(): number {
		if (this._discountInPercentage) {
			return (1 - this.discountValue / 100) * this.order.total;
		} else {
			return this.order.total - this.discountValue;
		}
	}

	get cash(): string {
		return this._cash;
	}

	set cash(value: string) {
		const n = Number(value);
		if (!isNaN(n)) {
			this.cashValue = n;
		}
	}

	get change(): number {
		return this.cashValue - this.afterDiscount;
	}

	constructor(private orderService: OrderService) {
		this.order = orderService.order;
		this._discount = this.format(this.discountValue);
		this._cash = this.format(this.cashValue);
	}

	formatDiscountToValue(): void {
		this._discount =
			this.discountValue.toString() +
			(this._discountInPercentage ? '%' : '');
	}

	formatDiscount(): void {
		if (this._discountInPercentage) {
			this._discount = `(-${this.discountValue} %)  ${this.format(
				-this.order.total + this.afterDiscount
			)}`;
		} else {
			this._discount = this.format(-this.discountValue);
		}
	}

	formatCashToValue(): void {
		this._cash = this.cashValue.toString();
	}

	formatCash(): void {
		this._cash = this.format(this.cashValue);
	}

	checkout(): void {
		this.orderService.order = new Order();
	}

	private format(n: number): string {
		return formatPhpCurrency(n);
	}
}
