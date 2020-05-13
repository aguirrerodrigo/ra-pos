import { SearchMatch } from './search-match';
import Conjunctions from '@root/assets/json/conjunctions.json';

export abstract class SearchStrategy {
	protected static conjunctions = new Set<string>(Conjunctions);

	matches: SearchMatch[] = [];

	abstract match(text: string, search: string): boolean;

	protected addMatch(index: number, length: number) {
		this.matches.push(new SearchMatch(index, length));
	}

	protected getWord(text: string, index: number): string {
		const spaceIndex = text.indexOf(' ', index);
		if (spaceIndex < 0) {
			return text.substr(index, text.length - index);
		} else {
			return text.substr(index, spaceIndex - index);
		}
	}
}
