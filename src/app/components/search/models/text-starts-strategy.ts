import { SearchStrategy } from './search-strategy';

export class TextStartsStrategy extends SearchStrategy {
	match(text: string, search: string): boolean {
		if (text.startsWith(search)) {
			super.addMatch(0, search.length);
			return true;
		}

		return false;
	}
}
