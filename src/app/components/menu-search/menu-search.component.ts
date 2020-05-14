import { Component } from '@angular/core';
import { SearchItem } from '@app/components/search/models/search-item';
import { MenuService } from '@app/services/menu.service';
import { OrderService } from '@app/services/order.service';
import { SearchStrategy } from '@app/components/search/models/search-strategy';
import { TextStartsStrategy } from '@app/components/search/models/text-starts-strategy';
import { WordStartsStrategy } from '@app/components/search/models/word-starts-strategy';
import { AcronymStrategy } from '@app/components/search/models/acronym-strategy';
import { BurgerWordStrategy } from './models/burger-word-strategy';
import { BurgerAcronymStrategy } from './models/burger-acronym-strategy';

@Component({
	selector: 'app-menu-search',
	templateUrl: './menu-search.component.html',
	styleUrls: ['./menu-search.component.scss']
})
export class MenuSearchComponent {
	searchItems: SearchItem[];
	searchStrategies: SearchStrategy[] = [
		new TextStartsStrategy(),
		new WordStartsStrategy(),
		new BurgerWordStrategy(),
		new AcronymStrategy(),
		new BurgerAcronymStrategy()
	];

	constructor(
		private menuService: MenuService,
		private orderService: OrderService
	) {
		this.searchItems = this.getSearchItems();
	}

	private getSearchItems(): SearchItem[] {
		const result: SearchItem[] = [];

		const menu = this.menuService.getMenu();
		for (const menuItem of menu) {
			result.push(new SearchItem(menuItem.name, menuItem));
		}

		return result;
	}

	onSelect(searchItem: SearchItem) {
		this.orderService.add(searchItem.model);
	}
}
