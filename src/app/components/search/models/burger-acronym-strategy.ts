import { SearchStrategy } from './search-strategy';
import { SearchResult } from './search-result';

export class BurgerAcronymStrategy implements SearchStrategy {
   match(text: string, search: string): SearchResult {
      let failed = new SearchResult();
      let result = new SearchResult();

      let burgerIndex = text.toLowerCase().indexOf('burger ');
      if (burgerIndex < 0 && text.endsWith('burger')) {
         burgerIndex = text.length - 6;
      }

      if (burgerIndex < 0) return failed;

      let index = 0;
      let matchCount = 0;
      if (search[0] == text[0]) {
         matchCount++;
         index++;

         while (
            matchCount < search.length &&
            index < text.length &&
            search[matchCount] == text[index]
         ) {
            matchCount++;
            index++;
         }

         result.addMatch(0, index);
      }

      while (matchCount < search.length) {
         if (search[matchCount] === ' ') {
            index = text.indexOf(' ', index);
            if (index < 0) {
               return failed;
            }

            matchCount++;
         } else {
            let nextWordIndex = text.indexOf(' ' + search[matchCount], index);

            if (search[matchCount] == 'b') {
               if (index > burgerIndex) {
                  burgerIndex = text.toLowerCase().indexOf('burger ', index);
                  if (burgerIndex < 0 && text.endsWith('burger')) {
                     burgerIndex = text.length - 6;
                     if (index > burgerIndex) {
                        return failed;
                     }
                  }
               }

               if (
                  nextWordIndex < 0 ||
                  (burgerIndex > 0 && burgerIndex < nextWordIndex)
               ) {
                  index = burgerIndex - 1;
               } else {
                  index = nextWordIndex;
               }
            } else {
               index = nextWordIndex;
            }

            if (index < 0) {
               return failed;
            }

            index++;
            let startIndex = index;
            while (
               matchCount < search.length &&
               index < text.length &&
               search[matchCount] == text[index]
            ) {
               matchCount++;
               index++;
            }
            result.addMatch(startIndex, index - startIndex);
         }
      }

      return result;
   }
}
