import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';

@Component({
	selector: 'app-add-item-search',
	templateUrl: './add-item-search.component.html',
	styleUrls: ['./add-item-search.component.scss']
})
export class AddItemSearchComponent extends SearchComponent {
	private addItemSearch = '';
	private formattedSearch = '';
	quantity = 1;

	get search() {
		return this.addItemSearch;
	}

	set search(value: string) {
		this.addItemSearch = value;

		this.formattedSearch = this.addItemSearch;
		this.formatSearch();
		super.search = this.formattedSearch;
	}

	constructor() {
		super();
	}

	private formatSearch() {
		this.quantity = 1;

		let numbers = '';
		for (const c of this.formattedSearch) {
			if ('0' <= c && c <= '9') {
				numbers += c;
			} else {
				break;
			}
		}

		if (numbers) {
			const n = Number(numbers);
			if (n > 0) {
				this.quantity = n;
			}
			this.formattedSearch = this.formattedSearch.substr(numbers.length);
		}
	}
}
