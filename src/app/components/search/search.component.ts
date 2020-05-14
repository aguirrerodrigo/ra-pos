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
	private _search = '';
	private _buffer = new Set<SearchItem>();
	result: SearchItem[] = [];
	selectedIndex = 0;

	get search() {
		return this._search;
	}

	set search(value: string) {
		this._search = value;

		if (!this.items) return;
		if (!this.searchStrategies) return;

		this._buffer.clear();
		if (this._search) {
			for (const strategy of this.searchStrategies) {
				for (const item of this.items) {
					if (this._buffer.has(item)) continue;

					if (item.match(this.search, strategy, this.caseSensitive)) {
						this._buffer.add(item);
					}
				}
			}
		}
		this.result = [...this._buffer];
		this.selectedIndex = 0;
	}

	@ContentChild(TemplateRef) searchItemTemplate: TemplateRef<SearchItem>;

	@Input() searchStrategies = [
		new TextStartsStrategy(),
		new WordStartsStrategy(),
		new AcronymStrategy()
	];
	@Input() placeholder = 'Search';
	@Input() caseSensitive = false;
	@Input() items: SearchItem[] = [];

	@Output() itemSelect = new EventEmitter<SearchItem>();

	searchChange() {
		this.result = Array.from(this._buffer.values());
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

		this.itemSelect.emit(this.result[this.selectedIndex]);
		this.search = '';
	}

	onEscKey(e: KeyboardEvent) {
		(e.target as HTMLInputElement).value = '';
		this.search = '';
	}

	onItemClick(searchItem: SearchItem): void {
		this.itemSelect.emit(searchItem);
		this.search = '';
	}
}
