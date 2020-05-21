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
	itemEdit = new EventEmitter<OrderItem>();

	editItem(orderItem: OrderItem): void {
		this.itemEdit.emit(orderItem);
	}

	add(menuItem: MenuItem, quantity = 1): void {
		let orderItem: OrderItem;

		if (this.map.hasMenuItem(menuItem)) {
			orderItem = this.map.getOrderItem(menuItem);
			orderItem.quantity += quantity;
		} else {
			orderItem = new OrderItem(menuItem);
			orderItem.quantity = quantity;
			this.map.set(menuItem, orderItem);

			this.order.add(orderItem);
		}

		this.orderChange.emit(this.order);
	}

	delete(orderItem: OrderItem): void {
		if (this.map.hasOrderItem(orderItem)) {
			this.map.deleteByOrderItem(orderItem);

			this.order.delete(orderItem);
			this.orderChange.emit(this.order);
		}
	}
}
