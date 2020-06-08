import { Component } from '@angular/core';
import { SearchComponent } from '@app/components/search/search.component';
import { SearchResultItem } from '@app/components/search/models/search-result-item';
import { isNullOrWhiteSpace } from '@app/utils';
import { MenuItem } from '@app/models/menu-item';

@Component({
	selector: 'app-add-item-search',
	templateUrl: './add-item-search.component.html',
	styleUrls: ['./add-item-search.component.scss']
})
export class AddItemSearchComponent extends SearchComponent {
	private addItemSearch = '';
	private formattedSearch = '';
	quantity = 1;

	get result(): SearchResultItem[] {
		return super.result;
	}

	set result(value: SearchResultItem[]) {
		if (!isNullOrWhiteSpace(this.formattedSearch)) {
			super.result = [...value, this.miscItem(this.formattedSearch)];
		} else {
			super.result = value;
		}
	}

	get search(): string {
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

	private formatSearch(): void {
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

	private miscItem(name: string): SearchResultItem {
		let price = 0;
		if (name) {
			const p = this.getMiscItemPrice(name);
			price = Number(p);
			if (!isNaN(price)) {
				name = name.substr(0, name.length - p.length);
			} else {
				price = 0;
			}
		}

		if (isNullOrWhiteSpace(name)) {
			name = 'Miscellaneous Item';
		} else {
			name = name.trim();
		}

		return {
			display: `<b>${name}</b>`,
			model: {
				name,
				description: 'Miscellaneous item',
				price,
				custom: true
			} as MenuItem
		} as SearchResultItem;
	}

	private getMiscItemPrice(name: string): string {
		let price = '';
		let hasDecimal = false;
		for (let i = name.length - 1; i >= 0; i--) {
			const c = name[i];
			if (c === '.' && !hasDecimal) {
				price = c + price;
				hasDecimal = true;
			} else if ('0' <= c && c <= '9') {
				price = c + price;
			} else {
				break;
			}
		}

		return price;
	}
}
