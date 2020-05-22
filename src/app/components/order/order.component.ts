import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { OrderService } from '@app/services/order.service';
import { InfoService } from '@app/services/info.service';
import { Order } from '@app/models/order';
import { OrderItem } from '@app/models/order-item';
import { OrderItemComponent } from '@app/components/order-item/order-item.component';

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

	@ViewChildren(OrderItemComponent, { read: ElementRef })
	orderItems: QueryList<ElementRef>;

	constructor(
		private orderService: OrderService,
		private infoService: InfoService
	) {
		this.order = orderService.order;
		this.orderService.orderChange.subscribe((o: Order) => (this.order = o));
		this.orderService.itemEdit.subscribe((item: OrderItem) =>
			this.onItemEdit(item)
		);
		this.orderService.orderUpdate.subscribe((o: Order) =>
			this.onOrderUpdate(o)
		);
		this.generateRandomInfo();
	}

	onArrowUpKey(e: KeyboardEvent): void {
		e.preventDefault();

		if (this.selectedIndex > 0) {
			this.selectedIndex--;
			this.scrollItemIntoView();
		}
	}

	onArrowDownKey(e: KeyboardEvent): void {
		e.preventDefault();

		if (this.selectedIndex < this.order.items.length - 1) {
			this.selectedIndex++;
			this.scrollItemIntoView();
		}
	}

	onEnterKey(e: KeyboardEvent): void {
		e.preventDefault();

		this.orderService.itemEdit.emit(this.order.items[this.selectedIndex]);
	}

	onArrowLeftKey(e: KeyboardEvent): void {
		e.preventDefault();

		if (this.order.items.length === 0) return;

		const item = this.order.items[this.selectedIndex];
		if (item.quantity > 1) {
			item.quantity--;

			this.orderService.orderUpdate.emit(this.order);
		}
	}

	onArrowRightKey(e: KeyboardEvent): void {
		e.preventDefault();

		if (this.order.items.length === 0) return;

		const item = this.order.items[this.selectedIndex];
		if (item.quantity < 9999) {
			item.quantity++;

			this.orderService.orderUpdate.emit(this.order);
		}
	}

	onDeleteKey(e: KeyboardEvent): void {
		e.preventDefault();

		const item = this.order.items[this.selectedIndex];
		this.orderService.delete(item);

		const length = this.order.items.length;
		if (this.selectedIndex > 0 && this.selectedIndex >= length) {
			this.selectedIndex = length - 1;
		}
	}

	editItem(item: OrderItem): void {
		this.orderService.itemEdit.emit(item);
	}

	private onItemEdit(item: OrderItem): void {
		this.selectedIndex = this.order.items.indexOf(item);
	}

	private onOrderUpdate(order: Order): void {
		if (this.order.count === 0) {
			this.generateRandomInfo();
		}
	}

	private generateRandomInfo(): void {
		this.randomInfo = this.infoService.getRandomInfo();
	}

	private scrollItemIntoView(): void {
		const item = this.orderItems.toArray()[this.selectedIndex];

		if (!this.itemInView(item)) {
			item.nativeElement.scrollIntoView(false);
		}
	}

	private itemInView(el: ElementRef): boolean {
		const rect = el.nativeElement.getBoundingClientRect();
		const elemTop = rect.top;
		const elemBottom = rect.bottom;

		// Only completely visible elements return true:
		const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
		return isVisible;
	}
}
