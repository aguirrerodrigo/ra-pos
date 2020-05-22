import { Component } from '@angular/core';
import { Payment } from '@app/models/payment';
import { PaymentService } from '@app/services/payment.service';
import { formatPhpCurrency } from '@app/utils';

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
	private _discount: string;
	private _cash: string;
	payment: Payment;

	get discount(): string {
		return this._discount;
	}

	set discount(value: string) {
		this.payment.discount.isPercentage = value.endsWith('%');
		if (this.payment.discount.isPercentage) {
			value = value.substr(value.length - 1);
		}

		const n = Number(value);
		if (!isNaN(n)) {
			this.payment.discount.value = Math.abs(n);
		}
	}

	get cash(): string {
		return this._cash;
	}

	set cash(value: string) {
		const n = Number(value);
		if (!isNaN(n)) {
			this.payment.cash = n;
		}
	}

	constructor(private paymentService: PaymentService) {
		this.paymentService.paymentChange.subscribe((p: Payment) =>
			this.setPayment(p)
		);
		this.paymentService.paymentUpdate.subscribe((p: Payment) =>
			this.setPayment(p)
		);
		this.setPayment(this.paymentService.payment);
	}

	formatDiscountFromValue(): void {
		this._discount =
			this.payment.discount.value.toString() +
			(this.payment.discount.isPercentage ? '%' : '');
	}

	formatDiscount(): void {
		if (this.payment.discount.isPercentage) {
			this._discount = `(-${
				this.payment.discount.value
			}%)  ${formatPhpCurrency(-this.payment.totalDiscount)}`;
		} else {
			this._discount = formatPhpCurrency(-this.payment.totalDiscount);
		}
	}

	formatCashFromValue(): void {
		this._cash = this.payment.cash.toString();
	}

	formatCash(): void {
		this._cash = formatPhpCurrency(this.payment.cash);
	}

	checkout(): void {
		this.paymentService.checkout();
	}

	private setPayment(payment: Payment): void {
		this.payment = payment;

		this.formatDiscount();
		this.formatCash();
	}
}
