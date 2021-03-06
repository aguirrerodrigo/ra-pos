import { SearchStrategy } from '@app/components/search/models/search-strategy';

export class BurgerAcronymStrategy extends SearchStrategy {
	private burgerIndex = -1;
	private index = 0;
	private matchCount = 0;
	private text = '';
	private search = '';

	match(text: string, search: string): boolean {
		this.burgerIndex = -1;
		this.index = 0;
		this.matchCount = 0;
		this.text = text;
		this.search = search;

		return this.doMatch();
	}

	private doMatch(): boolean {
		this.nextBurgerIndex();
		if (this.burgerIndex < 0) {
			return false;
		}

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

				// adjust index to burger if needed
				if (this.search[this.matchCount] === 'b' && this.burgerIndex > 0) {
					if (this.index < 0 || this.burgerIndex <= this.index + 1) {
						this.index = this.burgerIndex - 1;
						this.nextBurgerIndex();
					}
				}

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

	private nextBurgerIndex(): void {
		if (this.burgerIndex >= this.text.length - 6) {
			this.burgerIndex = -1;
			return;
		}

		this.burgerIndex = this.text
			.toLowerCase()
			.indexOf('burger ', this.burgerIndex + 1);
		if (this.burgerIndex < 0 && this.text.endsWith('burger')) {
			this.burgerIndex = this.text.length - 6;
		}
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
