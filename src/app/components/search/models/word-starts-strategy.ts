import { SearchStrategy } from './search-strategy';

export class WordStartsStrategy extends SearchStrategy {
	match(text: string, search: string): boolean {
		if (text.startsWith(search)) {
			super.addMatch(0, search.length);
			return true;
		}

		let index = text.indexOf(' ' + search);
		let word = '';
		while (index > 0) {
			index++;

			word = super.getWord(text, index);
			if (!SearchStrategy.conjunctions.has(word)) {
				super.addMatch(index, search.length);
				return true;
			}

			index = text.indexOf(' ' + search, index);
		}

		return false;
	}
}
