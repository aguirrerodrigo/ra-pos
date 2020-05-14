import { MenuItem } from './menu-item';

export class OrderItem {
	quantity = 1;

	get total() {
		return this.menuItem.price * this.quantity;
	}

	constructor(public menuItem: MenuItem) {
		if (!menuItem) throw Error('menuItem cannot is required.');
	}
}
