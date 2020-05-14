import {
	Component,
	Input,
	Output,
	ContentChild,
	TemplateRef,
	EventEmitter
} from '@angular/core';
import { SearchItem } from './models/search-item';
import { TextStartsStrategy } from './models/text-starts-strategy';
import { WordStartsStrategy } from './models/word-starts-strategy';
import { AcronymStrategy } from './models/acronym-strategy';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent {
	private buffer = new Set<SearchItem>();
	result: SearchItem[] = [];
	selectedIndex = 0;

	@ContentChild(TemplateRef) searchItemTemplate: TemplateRef<SearchItem>;

	@Input() searchStrategies = [
		new TextStartsStrategy(),
		new WordStartsStrategy(),
		new AcronymStrategy()
	];
	selectedItem: SearchItem;
	@Input() placeholder = 'Search';
	@Input() caseSensitive = false;
	@Input() items: SearchItem[] = [];

	@Output() selectedItemChange = new EventEmitter();

	search(s: string) {
		if (!this.items) return;
		if (!this.searchStrategies) return;

		this.buffer.clear();
		if (s) {
			for (const strategy of this.searchStrategies) {
				for (const item of this.items) {
					if (this.buffer.has(item)) continue;

					if (item.match(s, strategy, this.caseSensitive)) {
						this.buffer.add(item);
					}
				}
			}
		}

		this.result = Array.from(this.buffer.values());
		this.selectedIndex = 0;
	}

	onArrowDownKey(): void {
		if (this.selectedIndex < this.result.length - 1) {
			this.selectedIndex++;
		}
	}

	onArrowUpKey(): void {
		if (this.selectedIndex > 0) {
			this.selectedIndex--;
		}
	}

	onEnterKey() {
		if (!this.result || this.result.length === 0) return;

		this.selectedItem = this.result[this.selectedIndex];
		this.selectedItemChange.emit();
	}

	onEscKey(e: KeyboardEvent) {
		(e.target as HTMLInputElement).value = '';

		this.search('');
	}

	onItemClick(searchItem: SearchItem): void {
		this.selectedItem = searchItem;
		this.selectedItemChange.emit();
	}
}
