import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class OrderService {
	orderAdded = new EventEmitter<any>();

	constructor() {}

	getCurrentOrder() {
		return {
			items: ['Fried chicken', 'Beef and Mushroom Pizza (Lg)', 'Spaghetti']
		};
	}
}
