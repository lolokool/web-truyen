import { DetailChapter } from "../../../typeBook";

interface ChapterState {
  mangaList: DetailChapter[];
}

const initialState: ChapterState = {
  mangaList: [],
};

const chapterReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_CHAPTER":
      return {
        ...state,
        mangaList: [...state.mangaList, action.payload],
      };

    case "EDIT_CHAPTER":
      return {
        ...state,
        mangaList: state.mangaList.map((mangaList) =>
          mangaList.chapterId === action.payload.id ? action.payload : mangaList
        ),
      };

    case "DELETE_CHAPTER":
      return {
        ...state,
        mangaList: state.mangaList.filter(
          (mangaList) => mangaList.chapterId !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default chapterReducer;
