import { SearchStrategy } from './search-strategy';
import { SearchResult } from './search-result';

export class SearchItem {
    private lowerSearchText: string;
    formattedText: string;

    constructor(public searchText: string, public model: any) {
        this.lowerSearchText = searchText.toLowerCase();
    }

    match(s: string, strategy: SearchStrategy, caseSensitive = false): boolean {
        let result: SearchResult;

        if(!caseSensitive) {
            result = strategy.match(this.lowerSearchText, s.toLowerCase());
        } else {
            result = strategy.match(this.searchText, s);
        }

        if(result.success) {
            this.formattedText = this.formatText(result);
        }

        return result.success;
    }

    private formatText(searchResult: SearchResult): string {
        let result = '';
        let index = 0;
        for(let match of searchResult.matches) {
            if(match.startIndex > index) {
                result += this.searchText.substr(index, match.startIndex - index);
            }
            result += '<strong>' + this.searchText.substr(match.startIndex, match.length) + '</strong>';
            index = match.startIndex + match.length;
        }
        
        if(index < this.searchText.length) {
            result += this.searchText.substr(index);
        }

        return result;
    }
}