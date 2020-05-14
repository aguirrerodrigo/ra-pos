import { Injectable } from '@angular/core';
import { Order } from '@app/models/order';
import { MenuItem } from '@app/models/menu-item';

@Injectable({
	providedIn: 'root'
})
export class OrderService {
	current: Order = new Order();

	add(menuItem: MenuItem) {
		this.current.add(menuItem);
	}

	remove(menuItem: MenuItem) {
		this.current.remove(menuItem);
	}
}
