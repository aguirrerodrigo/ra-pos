import { Component, ViewChild, TemplateRef } from '@angular/core';
import { OrderItem } from '@app/models/order-item';
import { ModalService } from '../../services/modal.service';
import { OrderService } from '../../services/order.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-order-item-edit',
	templateUrl: './order-item-edit.component.html',
	styleUrls: ['./order-item-edit.component.scss']
})
export class OrderItemEditComponent {
	modal: NgbModalRef;
	item: OrderItem;
	quantity = 0;

	get total() {
		return this.item.price * this.quantity;
	}

	@ViewChild('content') content: TemplateRef<any>;

	constructor(
		private orderService: OrderService,
		private modalService: ModalService
	) {
		this.orderService.itemEdit.subscribe((e) => this.show(e));
	}

	cancel() {
		this.modal.dismiss();
	}

	delete() {
		this.orderService.delete(this.item);
		this.modal.close();
	}

	save() {
		this.item.quantity = this.quantity;
		this.modal.close();
	}

	show(item: OrderItem) {
		this.item = item;
		this.quantity = item.quantity;

		this.modal = this.modalService.open(this.content);
	}
}
