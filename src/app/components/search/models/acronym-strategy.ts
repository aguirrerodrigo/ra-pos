import { SearchStrategy } from './search-strategy';

export class AcronymStrategy extends SearchStrategy {
	private index = 0;
	private matchCount = 0;
	private text = '';
	private search = '';

	match(text: string, search: string): boolean {
		this.index = 0;
		this.matchCount = 0;
		this.text = text;
		this.search = search;

		return this.doMatch();
	}

	private doMatch(): boolean {
		if (this.search[0] === this.text[0]) {
			this.matchCurrentWord();
		}

		while (this.matchCount < this.search.length) {
			if (this.search[this.matchCount] === ' ') {
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
					this.matchCurrentWord();
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

	private matchCurrentWord(): void {
		const startIndex = this.index;
		while (
			this.matchCount < this.search.length &&
			this.index < this.text.length &&
			this.search[this.matchCount] === this.text[this.index]
		) {
			this.matchCount++;
			this.index++;
		}
		super.addMatch(startIndex, this.index - startIndex);
	}
}
