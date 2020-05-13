import { SearchStrategy } from './search-strategy';
import { SearchResult } from './search-result';

export class BurgerWordStrategy implements SearchStrategy {
	match(text: string, search: string) {
		const result = new SearchResult();

		if ('burger'.startsWith(search.toLowerCase())) {
			let burgerIndex = text.toLowerCase().indexOf('burger ');
			if (burgerIndex < 0 && text.endsWith('burger')) {
				burgerIndex = text.length - 6;
			}

			if (burgerIndex >= 0) {
				const index = text.indexOf(search);
				if (burgerIndex === index) {
					result.addMatch(index, search.length);
				}
			}
		}

		return result;
	}
}
