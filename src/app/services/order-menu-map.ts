import { MenuItem } from '@app/models/menu-item';
import { OrderItem } from '@app/models/order-item';

export class OrderMenuMap {
	menuMap = new Map<OrderItem, MenuItem>();
	orderMap = new Map<MenuItem, OrderItem>();

	hasMenuItem(menuItem: MenuItem): boolean {
		return this.orderMap.has(menuItem);
	}

	hasOrderItem(orderItem: OrderItem): boolean {
		return this.menuMap.has(orderItem);
	}

	getMenuItem(orderItem: OrderItem): MenuItem {
		return this.menuMap.get(orderItem);
	}

	getOrderItem(menuItem: MenuItem): OrderItem {
		return this.orderMap.get(menuItem);
	}

	set(menuItem: MenuItem, orderItem: OrderItem) {
		this.menuMap.set(orderItem, menuItem);
		this.orderMap.set(menuItem, orderItem);
	}

	deleteByOrderItem(orderItem: OrderItem) {
		const menuItem = this.getMenuItem(orderItem);

		this.menuMap.delete(orderItem);
		this.orderMap.delete(menuItem);
	}

	deleteByMenuItem(menuItem: MenuItem) {
		const orderItem = this.getOrderItem(menuItem);

		this.orderMap.delete(menuItem);
		this.menuMap.delete(orderItem);
	}
}
