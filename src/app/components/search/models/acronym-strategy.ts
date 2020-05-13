import { SearchStrategy } from './search-strategy';
import { SearchResult } from './search-result';

export class AcronymStrategy implements SearchStrategy {
	match(text: string, search: string): SearchResult {
		const failed = new SearchResult();
		const result = new SearchResult();

		let index = 0;
		let matchCount = 0;
		if (search[0] === text[0]) {
			matchCount++;
			index++;

			while (
				matchCount < search.length &&
				index < text.length &&
				search[matchCount] === text[index]
			) {
				matchCount++;
				index++;
			}

			result.addMatch(0, index);
		}

		while (matchCount < search.length) {
			if (search[matchCount] === ' ') {
				index = text.indexOf(' ', index);
				if (index < 0) {
					return failed;
				}

				matchCount++;
			} else {
				index = text.indexOf(' ' + search[matchCount], index);
				if (index < 0) {
					return failed;
				}

				index++;
				const startIndex = index;
				while (
					matchCount < search.length &&
					index < text.length &&
					search[matchCount] === text[index]
				) {
					matchCount++;
					index++;
				}
				result.addMatch(startIndex, index - startIndex);
			}
		}

		return result;
	}
}
