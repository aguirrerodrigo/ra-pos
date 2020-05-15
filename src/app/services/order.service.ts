import { Injectable, EventEmitter } from '@angular/core';
import { Order } from '@app/models/order';
import { MenuItem } from '@app/models/menu-item';

@Injectable({
	providedIn: 'root'
})
export class OrderService {
	order: Order = new Order();
	orderChange = new EventEmitter<Order>();

	add(menuItem: MenuItem) {
		this.order.add(menuItem);
		this.orderChange.emit(this.order);
	}

	remove(menuItem: MenuItem) {
		this.order.remove(menuItem);
		this.orderChange.emit(this.order);
	}
}
