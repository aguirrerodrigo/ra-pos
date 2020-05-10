import { SearchStrategy } from './search-strategy';
import { SearchResult } from './search-result';
import { WordTokenizer } from './word-tokenizer';
import Conjunctions from '@root/assets/json/conjunctions.json';

export class WordStartsStrategy implements SearchStrategy {
    private static conjunctions = new Set<string>(Conjunctions);

    match(text: string, search: string) {
        let result = new SearchResult();
        let tokenizer = new WordTokenizer(text);

        if(text.startsWith(search)) {
            result.addMatch(0, search.length);
        } else {
            let index = text.indexOf(search);
            if(index >= 0) {
                while(tokenizer.next()) {
                    if(tokenizer.index < index) {
                        continue;
                    }

                    if(index == tokenizer.index) {
                        if(!WordStartsStrategy.conjunctions.has(tokenizer.word)) {
                            result.addMatch(index, search.length);
                            break;
                        } 

                        index = text.indexOf(search, tokenizer.index + 1);
                        if(index < 0) {
                            break;
                        }
                    }
                }
            }
        }

        return result;
    }
}