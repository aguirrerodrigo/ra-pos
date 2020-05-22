import {
	Component,
	Input,
	Output,
	ContentChild,
	TemplateRef,
	EventEmitter,
	ViewChild,
	ElementRef
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
	private buffer = new Set<SearchItem>();
	result: SearchItem[] = [];
	selectedIndex = 0;

	get search(): string {
		return this._search;
	}

	set search(value: string) {
		this._search = value;

		if (!this.items) return;
		if (!this.searchStrategies) return;

		const search = this.leftTrim(value);
		this.buffer.clear();
		if (search) {
			for (const strategy of this.searchStrategies) {
				for (const item of this.items) {
					if (this.buffer.has(item)) continue;

					if (item.match(search, strategy, this.caseSensitive)) {
						this.buffer.add(item);
					}
				}
			}
		}
		this.result = [...this.buffer];
		this.selectedIndex = 0;
	}

	@ViewChild('searchInput') searchElement: ElementRef;
	@ContentChild(TemplateRef) searchItemTemplate: TemplateRef<SearchItem>;

	@Input() searchStrategies = [
		new TextStartsStrategy(),
		new WordStartsStrategy(),
		new AcronymStrategy()
	];
	@Input() placeholder = 'Search';
	@Input() caseSensitive = false;
	@Input() items: SearchItem[] = [];

	@Output() readonly itemSelect = new EventEmitter<SearchItem>();

	searchChange(): void {
		this.result = [...this.buffer];
		this.selectedIndex = 0;
	}

	onArrowDownKey(e: KeyboardEvent): void {
		e.preventDefault();

		if (this.selectedIndex < this.result.length - 1) {
			this.selectedIndex++;
		}
	}

	onArrowUpKey(e: KeyboardEvent): void {
		e.preventDefault();

		if (this.selectedIndex > 0) {
			this.selectedIndex--;
		}
	}

	onEnterKey(e: KeyboardEvent): void {
		e.preventDefault();

		if (!this.result || this.result.length === 0) return;

		this.itemSelect.emit(this.result[this.selectedIndex]);
		this.search = '';
	}

	onEscKey(e: KeyboardEvent): void {
		e.preventDefault();

		(e.target as HTMLInputElement).value = '';
		this.search = '';
	}

	onItemClick(searchItem: SearchItem): void {
		this.itemSelect.emit(searchItem);
		this.search = '';
		this.searchElement.nativeElement.focus();
	}

	focus(): void {
		this.searchElement.nativeElement.focus();
	}

	private leftTrim(s: string): string {
		if (!s) return s;

		let index = 0;
		while (index < s.length && s[index] === ' ') {
			index++;
		}
		return s.substr(index);
	}
}
