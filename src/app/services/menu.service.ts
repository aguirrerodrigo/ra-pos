import { Injectable } from '@angular/core';
import { MenuItem } from '@app/models/menu-item';
import Menu from '@src/assets/json/menu.json';

@Injectable({
	providedIn: 'root'
})
export class MenuService {
	private static menu: MenuItem[] = Menu;

	constructor() {}

	getMenu(): MenuItem[] {
		return MenuService.menu;
	}
}
