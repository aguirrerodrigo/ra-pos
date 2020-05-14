import { Component, OnInit } from '@angular/core';
import { OrderService } from '@app/services/order.service';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
	selectedIndex = 0;
	title = 'Order';
	items: string[];

	constructor(private orderService: OrderService) {
		this.items = orderService.getCurrentOrder().items;
	}

	onAdd(e: MouseEvent) {
		this.items.push('New Order Item');
		console.log(e);
	}

	ngOnInit(): void {}
}
