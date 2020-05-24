import { Component, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { OrderItem } from '@app/models/order-item';
import { ModalService } from '@app/services/modal.service';
import { OrderService } from '@app/services/order.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { formatPhpCurrency } from '@app/utils';

@Component({
	selector: 'app-order-item-edit',
	templateUrl: './order-item-edit.component.html',
	styleUrls: ['./order-item-edit.component.scss']
})
export class OrderItemEditComponent {
	private _price = '';
	modal: NgbModalRef;
	item: OrderItem;
	name = '';
	priceValue = 0;
	quantity = 0;

	get price(): string {
		return this._price;
	}

	set price(value: string) {
		this._price = value;
		const n = Number(value);
		if (!isNaN(n)) {
			this.priceValue = n;
		}
	}

	get total(): number {
		return this.priceValue * this.quantity;
	}

	@ViewChild('content') content: TemplateRef<any>;
	@ViewChild('customContent') customContent: TemplateRef<any>;

	constructor(
		private orderService: OrderService,
		private modalService: ModalService
	) {
		this.orderService.itemEdit.subscribe((i: OrderItem) => this.show(i));
		this.formatPrice();
	}

	cancel(): void {
		this.modal.dismiss();
	}

	delete(): void {
		this.orderService.delete(this.item);
		this.modal.close();
	}

	save(): void {
		this.item.name = this.name || 'Miscellaneous Item';
		this.item.price = this.priceValue;
		this.item.quantity = this.quantity;
		this.modal.close();

		this.orderService.orderUpdate.emit();
	}

	show(item: OrderItem): void {
		this.item = item;
		this.name = item.name;
		this.priceValue = item.price;
		this.quantity = item.quantity;
		this.formatPrice();

		setTimeout(() => {
			if (this.item.custom) {
				this.modal = this.modalService.open(this.customContent);
			} else {
				this.modal = this.modalService.open(this.content);
			}
		});
	}

	formatPrice(): void {
		this._price = formatPhpCurrency(this.priceValue);
	}

	formatPriceFromValue(): void {
		this._price = this.priceValue.toString();
	}
}
