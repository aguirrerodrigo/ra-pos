import { Component, OnInit } from '@angular/core';
import { SearchItem } from '@app/components/search/models/search-item';
import { MenuService } from '@app/services/menu.service';

@Component({
	selector: 'app-menu-search',
	templateUrl: './menu-search.component.html',
	styleUrls: ['./menu-search.component.scss']
})
export class MenuSearchComponent {
	searchItems: SearchItem[];

	constructor(private menuService: MenuService) {
		this.searchItems = this.getSearchItems();
	}

	private getSearchItems(): SearchItem[] {
		let result: SearchItem[] = [];

		var menu = this.menuService.getMenu();
		for (let menuItem of menu) {
			result.push(new SearchItem(menuItem.name, menuItem));
		}

		return result;
	}

	onSelect(searchItem: SearchItem) {
		alert(`'Item selected: ${searchItem.model.name}`);
	}
}
