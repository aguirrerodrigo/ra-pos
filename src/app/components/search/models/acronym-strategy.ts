import { SearchStrategy } from './search-strategy';
import { SearchResult } from './search-result';

export class AcronymStrategy implements SearchStrategy {
   match(text: string, search: string): SearchResult {
      let result = new SearchResult();

      let index = 0;
      let matchCount = 0;
      if (search[0] == text[0]) {
         matchCount++;
         index++;

         while (search[matchCount] == text[index]) {
            matchCount++;
            index++;
         }

         result.addMatch(0, index);
      }

      return result;
   }
}
