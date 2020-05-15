import { Component } from '@angular/core';
import { OrderService } from '@app/services/order.service';
import { InfoService } from '@app/services/info.service';
import { Order } from '@app/models/order';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss']
})
export class OrderComponent {
	title = 'Order';
	randomInfo = '';
	selectedIndex = 0;
	order: Order;

	constructor(
		private orderService: OrderService,
		private infoService: InfoService
	) {
		this.order = orderService.order;
		this.orderService.orderChange.subscribe((o: Order) =>
			this.onOrderChange(o)
		);
		this.generateRandomInfo();
	}

	private onOrderChange(order: Order) {
		this.order = order;
		if (this.order.count === 0) {
			this.generateRandomInfo();
		}
	}

	generateRandomInfo(): void {
		this.randomInfo = this.infoService.getRandomInfo();
	}
}
