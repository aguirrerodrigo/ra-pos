import { SearchStrategy } from './search-strategy';
import { SearchMatch } from './search-match';

export class SearchItem {
	private lowerSearchText: string;
	formattedText: string;

	constructor(public searchText: string, public model: any) {
		this.lowerSearchText = searchText.toLowerCase();
	}

	match(
		s: string,
		strategy: SearchStrategy,
		caseSensitive: boolean = false
	): boolean {
		let found = false;

		strategy.matches = [];
		if (!caseSensitive) {
			found = strategy.match(this.lowerSearchText, s.toLowerCase());
		} else {
			found = strategy.match(this.searchText, s);
		}

		if (found) {
			this.formattedText = this.formatText(strategy.matches);
		}

		return found;
	}

	private formatText(matches: SearchMatch[]): string {
		let result = '';
		let index = 0;
		for (const match of matches) {
			if (match.startIndex > index) {
				result += this.searchText.substr(index, match.startIndex - index);
			}
			result +=
				'<strong>' +
				this.searchText.substr(match.startIndex, match.length) +
				'</strong>';
			index = match.startIndex + match.length;
		}

		if (index < this.searchText.length) {
			result += this.searchText.substr(index);
		}

		return result;
	}
}
