import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor() { }
  
  getCurrentOrder() {
    return {
      items: ['Fried chicken', 'Beef and Mushroom Pizza (Lg)', 'Spaghetti']
    };
  }
}
