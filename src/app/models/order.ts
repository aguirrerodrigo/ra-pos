import { OrderItem } from './order-item';

export class Order {
	private set = new Set<OrderItem>();

	get items() {
		return [...this.set];
	}

	get count(): number {
		let count = 0;
		for (const item of this.set) {
			count += item.quantity;
		}

		return count;
	}

	get total(): number {
		let total = 0;
		for (const item of this.set) {
			total += item.total;
		}

		return total;
	}

	add(item: OrderItem) {
		if (!this.set.has(item)) {
			this.set.add(item);
		}
	}

	delete(item: OrderItem) {
		if (this.set.has(item)) {
			this.set.delete(item);
		}
	}
}
