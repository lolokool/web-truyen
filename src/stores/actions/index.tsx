import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../stores/index";
import { Action } from "redux";
import { Book, DetailChapter } from "../../typeBook";
import { User } from "../../pages/admin/user/user";
import { ENV_BE } from "../../constants";

// Book Actions
export const addBook = (book: Book) => ({
  type: "ADD_BOOK",
  payload: book,
});

export const editBook = (book: Book) => ({
  type: "UPDATE_BOOK",
  payload: book,
});

export const deleteBook = (id: string) => ({
  type: "DELETE_BOOK",
  payload: id,
});

export const setBooks = (books: Book[]) => ({
  type: "SET_BOOKS",
  payload: books,
});

// User Actions
export const fetchUsersSuccess = (users: User[]) => ({
  type: "SET_USERS",
  payload: users,
});

export const addUserSuccess = (user: User) => ({
  type: "ADD_USER",
  payload: user,
});

export const editUserSuccess = (user: User) => ({
  type: "UPDATE_USER",
  payload: user,
});

export const deleteUserSuccess = (id: number) => ({
  type: "DELETE_USER",
  payload: id,
});

// Chapter action
export const addChap = (chapter: DetailChapter) => ({
  type: "ADD_CHAPTER",
  payload: chapter,
});

export const editChap = (chapter: DetailChapter) => ({
  type: "EDIT_CHAPTER",
  payload: chapter,
});

export const deleteChap = (chapterId: string) => ({
  type: "DELETE_CHAPTER",
  payload: chapterId,
});

// Book async Actions

export const getMangas = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ENV_BE}/MangaList`);
      dispatch(setBooks(response.data));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};

export const addMangas = (
  book: Book
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${ENV_BE}/MangaList`, book);
      dispatch(addBook(response.data));
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
};

export const editMangas = (
  book: Book
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      await axios.put(`${ENV_BE}/MangaList/${book.id}`, book);
      dispatch(editBook(book));
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };
};

export const deleteMangas = (
  id: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      await axios.delete(`${ENV_BE}/MangaList/${id}`);
      dispatch(deleteBook(id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
};

// Users Async Actions
export const fetchUsers = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ENV_BE}/users`);
      dispatch(fetchUsersSuccess(response.data));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};

export const addUser = (
  user: User
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${ENV_BE}/users`, user);
      dispatch(addUserSuccess(response.data));
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
};

export const editUser = (
  user: User
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      await axios.put(`${ENV_BE}/users/${user.id}`, user);
      dispatch(editUserSuccess(user));
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };
};

export const deleteUser = (
  id: number
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      await axios.delete(`${ENV_BE}/users/${id}`);
      dispatch(deleteUserSuccess(id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
};

// Thêm chương mới
export const addChapter = (
  chapter: DetailChapter,
  id: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${ENV_BE}/MangaList/${id}/detailChapter`,
        chapter
      );
      dispatch(addChap(chapter));
    } catch (error) {
      console.error(error);
    }
  };
};

// Sửa chương
export const editChapter = (
  chapter: DetailChapter,
  id: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${ENV_BE}/MangaList/${id}/detailChapter/${chapter.chapterId}`,
        chapter
      );
      dispatch(editChap(chapter));
    } catch (error) {
      console.error(error);
    }
  };
};

// Xóa chương
export const deleteChapter = (
  chapterId: string,
  id: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `${ENV_BE}/MangaList/${id}/detailChapter/${chapterId}`
      );
      dispatch(deleteChap(chapterId));
    } catch (error) {
      console.error(error);
    }
  };
};
