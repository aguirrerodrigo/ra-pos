import { SearchStrategy } from '@app/components/search/models/search-strategy';

export class BurgerWordStrategy extends SearchStrategy {
	match(text: string, search: string) {
		if (!'burger'.startsWith(search.toLowerCase())) return false;

		let burgerIndex = text.toLowerCase().indexOf('burger ');
		if (burgerIndex < 0 && text.endsWith('burger')) {
			burgerIndex = text.length - 6;
		}

		if (burgerIndex >= 0) {
			super.addMatch(burgerIndex, search.length);
			return true;
		}

		return false;
	}
}
