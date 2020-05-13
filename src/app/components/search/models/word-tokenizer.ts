export class WordTokenizer {
	index = 0;
	word = '';

	constructor(public s: string) {}

	next(): boolean {
		this.index = this.index + this.word.length;
		for (let i = this.index; i < this.s.length; i++) {
			if (this.s[i] !== ' ') {
				this.index = i;

				let spaceIndex = this.s.indexOf(' ', this.index);
				if (spaceIndex < 0) {
					spaceIndex = this.s.length;
				}

				this.word = this.s.substr(this.index, spaceIndex - this.index);
				return true;
			}
		}

		return false;
	}
}
