import { Component, OnInit } from '@angular/core';
import { SearchItem } from '@app/components/search/models/search-item';
import { MenuService } from '@app/services/menu.service';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent {
  searchItems: SearchItem[];

  constructor(private menuService: MenuService) { 
    this.searchItems = this.getSearchItems();
  }

  private getSearchItems(): SearchItem[] {
    let result: SearchItem[] = [];

    var menu = this.menuService.getMenu();
    for(let menuItem of menu) {
      result.push( 
        new SearchItem(menuItem.name, menuItem));
    }
      
    return result;
  }

}