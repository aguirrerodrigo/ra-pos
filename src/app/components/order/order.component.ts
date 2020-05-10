import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { MenuService } from 'src/app/services/menu.service';
import { SearchItem } from '../search/models/search-item';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {  
  title = 'Order';
  items: string[];
  searchItems: SearchItem[];

  constructor(private orderService: OrderService, private menuService: MenuService) { 
    this.items = orderService.getCurrentOrder().items;
    this.searchItems = this.getSearchItems();
  }

  getSearchItems(): SearchItem[] {
    let result: SearchItem[] = [];

    this.menuService.getMenu().forEach(menuItem => {
      result.push(
        new SearchItem(menuItem.name, menuItem));
    });

    return result;
  }
  
  onAdd(e: MouseEvent) {
    this.items.push('New Order Item');
    console.log(e);
  }

  ngOnInit(): void {
  }

}