import { Component } from '@angular/core';
import { OrderService } from '@app/services/order.service';
import { Order } from '../../models/order';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss']
})
export class OrderComponent {
	title = 'Order';
	selectedIndex = 0;
	order: Order;

	constructor(private orderService: OrderService) {
		this.order = orderService.current;
	}
}
