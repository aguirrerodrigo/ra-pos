import { SearchStrategy } from './search-strategy';
import { SearchResult } from './search-result';

export class TextStartsStrategy implements SearchStrategy {
	match(text: string, search: string) {
		const result = new SearchResult();

		if (text.startsWith(search)) {
			result.addMatch(0, search.length);
		}

		return result;
	}
}
