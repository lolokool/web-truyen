import { Book } from "../../../typeBook";

interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [],
};

const bookReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_BOOKS":
      return {
        ...state,
        books: action.payload,
      };
    case "ADD_BOOK":
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case "UPDATE_BOOK":
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case "DELETE_BOOK":
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };

    default:
      return state;
  }
};

export default bookReducer;
