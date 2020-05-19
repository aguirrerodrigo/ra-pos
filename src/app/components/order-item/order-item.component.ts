import { Component, Input, ViewChild } from '@angular/core';
import { OrderItem } from '@app/models/order-item';
import { OrderService } from '@app/services/order.service';

@Component({
	selector: 'app-order-item',
	templateUrl: './order-item.component.html',
	styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent {
	@Input() item: OrderItem;

	constructor(private orderService: OrderService) {}
}
