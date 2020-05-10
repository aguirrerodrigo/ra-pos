import { Component, Input, Output, ContentChild, TemplateRef } from '@angular/core';
import { SearchItem } from './models/search-item';
import { TextStartsStrategy } from './models/text-starts-strategy';
import { WordStartsStrategy } from './models/word-starts-strategy';
import { BurgerWordStrategy } from './models/burger-word-strategy';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  private buffer = new Set<SearchItem>();
  result = [];
  selectedIndex = 0;

  @ContentChild(TemplateRef) searchItemTemplate: TemplateRef<SearchItem>;

  @Input() searchStrategies = [new TextStartsStrategy(), new WordStartsStrategy(), new BurgerWordStrategy()];
  @Input() caseSensitive = false;
  @Input() items: SearchItem[] = [];

  @Output() onSelect() {
  }

  search(s: string) {
    if(!this.items) return;
    if(!this.searchStrategies) return;

    this.buffer.clear();
    if(s) {
      for(let strategy of this.searchStrategies) {
        for(let item of this.items) {
          if(this.buffer.has(item)) {
            continue;
          }
          
          if(item.match(s, strategy, this.caseSensitive)) {
            this.buffer.add(item);
          }
        }
      }
    }

    this.result = Array.from(this.buffer.values());
    this.selectedIndex = 0;
  }

  selectNext(): void {
    if(this.selectedIndex < this.result.length - 1) {
      this.selectedIndex++;
    }
  }

  selectPrevious(): void {
    if(this.selectedIndex > 0) {
      this.selectedIndex--;
    }
  }
}