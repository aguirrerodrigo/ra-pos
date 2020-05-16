import { Component, Input } from '@angular/core';
import { OrderItem } from '@app/models/order-item';
import { OrderService } from '../../services/order.service';

@Component({
	selector: 'app-order-item',
	templateUrl: './order-item.component.html',
	styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent {
	@Input() item: OrderItem;
	@Input() isSelected: boolean;

	constructor(private orderService: OrderService) {}

	selectItem() {
		if (this.item.quantity > 1) {
			this.item.quantity--;
		} else {
			this.orderService.delete(this.item);
		}
	}
}
