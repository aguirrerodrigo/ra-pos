import { MenuItem } from './menu-item';

export class OrderItem {
	name = '';
	description = '';
	price = 0;
	quantity = 1;

	get total() {
		return this.price * this.quantity;
	}

	constructor(menuItem: MenuItem) {
		this.name = menuItem.name;
		this.description = menuItem.description;
		this.price = menuItem.price;
	}
}
