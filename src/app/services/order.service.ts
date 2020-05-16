import { Injectable, EventEmitter } from '@angular/core';
import { Order } from '@app/models/order';
import { MenuItem } from '@app/models/menu-item';
import { OrderItem } from '@app/models/order-item';
import { OrderMenuMap } from './order-menu-map';

@Injectable({
	providedIn: 'root'
})
export class OrderService {
	map = new OrderMenuMap();
	order = new Order();
	orderChange = new EventEmitter<Order>();

	add(menuItem: MenuItem, quantity = 1) {
		let orderItem: OrderItem;

		if (this.map.hasMenuItem(menuItem)) {
			orderItem = this.map.getOrderItem(menuItem);
			orderItem.quantity += quantity;
		} else {
			orderItem = new OrderItem(menuItem);
			this.map.set(menuItem, orderItem);

			this.order.add(orderItem);
		}

		this.orderChange.emit(this.order);
	}

	delete(orderItem: OrderItem) {
		if (this.map.hasOrderItem(orderItem)) {
			this.map.deleteByOrderItem(orderItem);

			this.order.delete(orderItem);
			this.orderChange.emit(this.order);
		}
	}
}
