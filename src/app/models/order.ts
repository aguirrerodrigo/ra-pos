import { OrderItem } from './order-item';

export class Order {
	items = new Set<OrderItem>();

	get count(): number {
		let count = 0;
		for (const item of this.items) {
			count += item.quantity;
		}

		return count;
	}

	get total(): number {
		let total = 0;
		for (const item of this.items) {
			total += item.total;
		}

		return total;
	}

	add(item: OrderItem) {
		if (!this.items.has(item)) {
			this.items.add(item);
		}
	}

	delete(item: OrderItem) {
		if (this.items.has(item)) {
			this.items.delete(item);
		}
	}
}
