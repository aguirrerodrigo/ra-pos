import { Order } from './order';
import { Discount } from './discount';

export class Payment {
	discount = new Discount();
	cash = 0;

	get total(): number {
		return this.order.total;
	}

	get totalDiscount(): number {
		if (this.discount.isPercentage) {
			return (this.discount.value / 100) * this.order.total;
		} else {
			return this.discount.value;
		}
	}

	get afterDiscount(): number {
		return this.order.total - this.totalDiscount;
	}

	get change(): number {
		return this.cash - this.afterDiscount;
	}

	constructor(private order: Order) {}
}
