import { Component } from '@angular/core';
import { OrderService } from '@app/services/order.service';
import { InfoService } from '@app/services/info.service';
import { Order } from '@app/models/order';
import { OrderItem } from '@app/models/order-item';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss']
})
export class OrderComponent {
	title = 'Order';
	randomInfo = '';
	order: Order;
	selectedIndex = 0;

	constructor(
		private orderService: OrderService,
		private infoService: InfoService
	) {
		this.order = orderService.order;
		this.orderService.orderChange.subscribe((o: Order) => (this.order = o));
		this.orderService.itemEdit.subscribe((item: OrderItem) =>
			this.onItemEditing(item)
		);
		this.orderService.itemsChange.subscribe((o: Order) =>
			this.onItemsChange(o)
		);
		this.generateRandomInfo();
	}

	onArrowUpKey(): void {
		if (this.selectedIndex > 0) {
			this.selectedIndex--;
		}
	}

	onArrowDownKey(): void {
		if (this.selectedIndex < this.order.items.length - 1) {
			this.selectedIndex++;
		}
	}

	onEnterKey(): void {
		this.orderService.editItem(this.order.items[this.selectedIndex]);
	}

	onArrowLeftKey(): void {
		if (this.order.items.length === 0) return;

		const item = this.order.items[this.selectedIndex];
		if (item.quantity > 1) {
			item.quantity--;
		}
	}

	onArrowRightKey(): void {
		if (this.order.items.length === 0) return;

		const item = this.order.items[this.selectedIndex];
		if (item.quantity < 9999) {
			item.quantity++;
		}
	}

	onDeleteKey(): void {
		const item = this.order.items[this.selectedIndex];
		this.orderService.delete(item);

		const length = this.order.items.length;
		if (this.selectedIndex > 0 && this.selectedIndex >= length) {
			this.selectedIndex = length - 1;
		}
	}

	editItem(item: OrderItem): void {
		this.orderService.editItem(item);
	}

	private onItemEditing(item: OrderItem): void {
		this.selectedIndex = this.order.items.indexOf(item);
	}

	private onItemsChange(order: Order): void {
		this.order = order;
		if (this.order.count === 0) {
			this.generateRandomInfo();
		}
	}

	private generateRandomInfo(): void {
		this.randomInfo = this.infoService.getRandomInfo();
	}
}
