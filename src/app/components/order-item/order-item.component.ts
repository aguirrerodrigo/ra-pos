import { Component, Input, ViewChild } from '@angular/core';
import { OrderItem } from '@app/models/order-item';
import { OrderService } from '../../services/order.service';
import { OrderItemEditComponent } from '../order-item-edit/order-item-edit.component';

@Component({
	selector: 'app-order-item',
	templateUrl: './order-item.component.html',
	styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent {
	@Input() item: OrderItem;

	constructor(private orderService: OrderService) {}

	selectItem() {
		this.orderService.editItem(this.item);
	}
}
