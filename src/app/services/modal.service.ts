import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
	providedIn: 'root'
})
export class ModalService {
	constructor(private ngbModal: NgbModal) {}

	open(content: any): NgbModalRef {
		const modal = this.ngbModal.open(content, {
			centered: !this.isTouchDevice()
		});
		const backdropElem = (modal as any)._backdropCmptRef.location
			.nativeElement;
		const modalElem = (modal as any)._windowCmptRef.location.nativeElement;
		setTimeout(() => {
			backdropElem.classList.add('animate');
			modalElem.classList.add('animate');
		});

		const fx = (modal as any)._removeModalElements.bind(modal);
		(modal as any)._removeModalElements = () => {
			backdropElem.classList.remove('animate');
			modalElem.classList.remove('animate');
			setTimeout(fx, 250);
		};

		return modal;
	}

	private isTouchDevice() {
		return 'ontouchstart' in document.documentElement;
	}
}
