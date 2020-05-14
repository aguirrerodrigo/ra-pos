import { MenuItem } from './menu-item';
import { OrderItem } from './order-item';

export class Order {
	private map = new Map<MenuItem, OrderItem>();
	items = new Set<OrderItem>();
	count = 0;
	total = 0;

	add(menuItem: MenuItem) {
		if (this.map.has(menuItem)) {
			this.map.get(menuItem).quantity++;
		} else {
			const item = new OrderItem(menuItem);
			this.map.set(menuItem, item);
			this.items.add(item);
		}
		this.total += menuItem.price;
		this.count++;
	}

	remove(menuItem: MenuItem) {
		if (this.map.has(menuItem)) {
			const item = this.map.get(menuItem);
			this.map.delete(menuItem);
			this.items.delete(item);
			this.total -= menuItem.price * item.quantity;
			this.count -= item.quantity;
		}
	}
}
