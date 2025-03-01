"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BookInfoType } from "@/components/book/book";
/* import { DEFAULT_MAX_RESULTS_BOOKS_LOADING } from "../components/config"; */

type BookStoreType = {
  books: BookInfoType[];
  activeCategory: string;
  lastCounter: number;
  loader: boolean;
  error: string | null;
};

type FetchParameters = {
  activeCategory: string;
  startIndex: number;
};

const initialState: BookStoreType = {
  books: [],
  activeCategory: "Architecture",
  lastCounter: 0,
  loader: false,
  error: null,
};

export const getBooks = createAsyncThunk<BookInfoType[], FetchParameters>(
  "books/getBooks",
  async (parameters) => {
    const category = parameters.activeCategory;
    const startIndex = parameters.startIndex;
    const response = await fetch(
      `/api/books?q="subject=${category}"&startIndex=${startIndex}&maxResults=6`
    );
    if (!response.ok) {
      throw new Error("Oops, fake server failed");
    }
    const data = await response.json();

    return data.items;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },

    clearLoadedBooks: (state) => {
      state.books = [];
    },

    setStartIndex: (state, action: PayloadAction<number>) => {
      state.lastCounter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getBooks.pending, (state) => {
        state.loader = true;
      })

      .addCase(
        getBooks.fulfilled,
        (state, action: PayloadAction<BookInfoType[]>) => {
          state.loader = false;
          state.books = state.books.concat(action.payload);
        }
      )

      .addCase(getBooks.rejected, (state, action) => {
        state.error = action.error.message || null;
      });
  },
});

export const { setCategory, clearLoadedBooks, setStartIndex } =
  booksSlice.actions;
export default booksSlice.reducer;
