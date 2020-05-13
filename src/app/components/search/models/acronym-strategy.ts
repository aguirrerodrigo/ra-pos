import { SearchStrategy } from './search-strategy';

export class AcronymStrategy extends SearchStrategy {
	private index = 0;
	private matchCount = 0;
	private text = '';
	private search = '';

	match(text: string, search: string) {
		this.index = 0;
		this.matchCount = 0;
		this.text = text;
		this.search = search;

		if (search[0] === text[0]) {
			this.scanWordMatches();
			super.addMatch(0, this.index);
		}

		while (this.matchCount < this.search.length) {
			if (search[this.matchCount] === ' ') {
				this.index = this.text.indexOf(' ', this.index);
				if (this.index < 0) {
					return false;
				}

				this.matchCount++;
			} else {
				this.index = this.text.indexOf(
					' ' + this.search[this.matchCount],
					this.index
				);
				if (this.index < 0) {
					return false;
				}

				this.index++;
				if (!this.checkFirstWordConjunction()) {
					const startIndex = this.index;
					this.scanWordMatches();
					super.addMatch(startIndex, this.index - startIndex);
				}
			}
		}
		return true;
	}

	private checkFirstWordConjunction(): boolean {
		if (this.matchCount > 0) return false;

		const word = this.getWord(this.text, this.index);
		return SearchStrategy.conjunctions.has(word);
	}

	private scanWordMatches(): void {
		while (
			this.matchCount < this.search.length &&
			this.index < this.text.length &&
			this.search[this.matchCount] === this.text[this.index]
		) {
			this.matchCount++;
			this.index++;
		}
	}
}
