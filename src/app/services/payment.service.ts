import { Injectable, EventEmitter } from '@angular/core';
import { Payment } from '@app/models/payment';
import { OrderService } from './order.service';
import { Order } from '@app/models/order';

@Injectable({
	providedIn: 'root'
})
export class PaymentService {
	private _payment: Payment;
	paymentChange = new EventEmitter<Payment>();

	get payment(): Payment {
		return this._payment;
	}

	set payment(value: Payment) {
		this._payment = value;
		this.paymentChange.emit(this._payment);
	}

	constructor(private orderService: OrderService) {
		orderService.orderChange.subscribe(
			(o: Order) => (this.payment = new Payment(this.orderService.order))
		);
		this.payment = new Payment(orderService.order);
	}

	checkout(): void {
		this.orderService.order = new Order();
	}
}
