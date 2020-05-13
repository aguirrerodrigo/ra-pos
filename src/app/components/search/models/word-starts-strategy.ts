import { SearchStrategy } from './search-strategy';
import { SearchResult } from './search-result';
import { WordTokenizer } from './word-tokenizer';
import Conjunctions from '@root/assets/json/conjunctions.json';

export class WordStartsStrategy implements SearchStrategy {
	private static conjunctions = new Set<string>(Conjunctions);

	match(text: string, search: string) {
		const result = new SearchResult();

		if (text.startsWith(search)) {
			result.addMatch(0, search.length);
		} else {
			let index = text.indexOf(' ' + search);
			while (index > 0) {
				index++;

				const word = this.getFirstWord(text, index);
				if (!WordStartsStrategy.conjunctions.has(word)) {
					result.addMatch(index, search.length);
					break;
				}

				index = text.indexOf(' ' + search, index + word.length);
			}
		}

		return result;
	}

	getFirstWord(text: string, index: number): string {
		const spaceIndex = text.indexOf(' ', index);
		if (spaceIndex < 0) {
			return text.substr(index, text.length - index);
		} else {
			return text.substr(index, spaceIndex - index);
		}
	}
}
