import { useMemo, useState } from "react";

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

type Props<T extends object> = {
  items: T[];
  searchKeys: Extract<StringKeys<T>, string>[];
};

/**
 * Search Hook for Array of objects
 * Only attributes whose value is a string can be searched.
 */
export const useSearch = <T extends object>({
  items,
  searchKeys,
}: Props<T>) => {
  const [searchWord, setSearchWord] = useState("");

  const searchWordList = searchWord.replace(/\s+/g, " ").split(" ");

  const results = useMemo(
    () =>
      items.filter((item) =>
        searchWordList.every((searchWord) =>
          searchKeys.some((key) => String(item[key]).includes(searchWord))
        )
      ),
    [items, searchKeys, searchWordList]
  );

  return {
    results,
    searchWord,
    setSearchWord,
  };
};
