import { Injectable, EventEmitter } from '@angular/core';
import { Order } from '@app/models/order';
import { MenuItem } from '@app/models/menu-item';
import { OrderItem } from '@app/models/order-item';
import { OrderMenuMap } from './order-menu-map';
import { isNullOrWhiteSpace } from '@app/utils';

@Injectable({
	providedIn: 'root'
})
export class OrderService {
	private map = new OrderMenuMap();
	private _order = new Order();
	readonly orderChange = new EventEmitter<Order>();
	readonly orderUpdate = new EventEmitter<Order>();
	readonly itemEdit = new EventEmitter<OrderItem>();

	get order(): Order {
		return this._order;
	}

	set order(value: Order) {
		this.map = new OrderMenuMap();
		this._order = value;
		this.orderChange.emit(this._order);
	}

	add(menuItem: MenuItem, quantity: number = 1): void {
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

		this.orderUpdate.emit(this.order);

		if (
			orderItem.price === 0 ||
			isNullOrWhiteSpace(orderItem.name) ||
			orderItem.name === 'Miscellaneous Item'
		) {
			this.itemEdit.emit(orderItem);
		}
	}

	delete(orderItem: OrderItem): void {
		if (this.map.hasOrderItem(orderItem)) {
			this.map.deleteByOrderItem(orderItem);

			this.order.delete(orderItem);
			this.orderUpdate.emit(this.order);
		}
	}
}
