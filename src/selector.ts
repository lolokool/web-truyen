// selectors.ts
import { RootState } from "./stores";
import { Book } from "./typeBook";
import { createSelector } from "reselect";

export const selectWhatsNew = (state: RootState) =>
  state.bookReducer.books.filter((manga: Book) => manga.whatsNew === true);

export const selectBooks = (state: RootState) =>
  state.bookReducer.books.filter((manga: Book) => manga.featured === true);

export const selectMemoized = createSelector(
  selectWhatsNew,
  selectBooks,
  (whatsNew, books) => ({ whatsNew, books })
);
