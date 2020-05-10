import { Component, Input, Output } from '@angular/core';
import { SearchItem } from './models/search-item';
import { TextStartsStrategy } from './models/text-starts-strategy';
import { WordStartsStrategy } from './models/word-starts-strategy';
import { SearchStrategy } from './models/search-strategy';
import { BurgerWordStrategy } from './models/burger-word-strategy';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  private buffer = {};
  result = [];

  @Input() searchStrategies = [new TextStartsStrategy(), new WordStartsStrategy(), new BurgerWordStrategy()];
  @Input() caseSensitive = false;
  @Input() items: SearchItem[] = [];

  @Output() onSelect() {
  }

  search(s: string) {
    if(!this.items) return;
    if(!this.searchStrategies) return;

    this.buffer = {};
    if(s) {
      for(let item of this.items) {
        for(let strategy of this.searchStrategies) {
          if(item.match(s, strategy, this.caseSensitive)) {
            this.addResult(item, strategy);
            break;
          }
        }
      }
    }

    this.result = this.finalizeResult();
  }

  private addResult(item: SearchItem, strategy: SearchStrategy) {
    if(!this.buffer[strategy.constructor.name]) {
      this.buffer[strategy.constructor.name] = [];
    }

    this.buffer[strategy.constructor.name].push(item);
  }

  private finalizeResult(): SearchItem[] {
    const result: SearchItem[] = [];
    
    for(let strategy of this.searchStrategies) {

      if(this.buffer[strategy.constructor.name]) {
        for(let item of this.buffer[strategy.constructor.name]) {
          result.push(item);
        }
      }
    }

    return result;
  }
}