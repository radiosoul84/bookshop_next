"use client";

import { createSlice } from "@reduxjs/toolkit";

export type BookType = {
  title: string;
  authors: string;
  rating: number;
  reviews: number;
  image: string;
  price: number;
  id: string;
};

type BookToShowType = {
  book: BookType;
  quantity: number;
  commonPrice: number;
};

type CartStoreType = {
  booksInCart: BookType[];
  booksToShow: BookToShowType[];
  totalPrice: number;
};

const initialState: CartStoreType = {
  booksInCart: [],
  booksToShow: [],
  totalPrice: 0,
};

function addBookToCart(state: CartStoreType, book: BookType) {
  if (state.booksInCart.length == 0) {
    state.booksToShow.push({
      book: book,
      quantity: 1,
      commonPrice: book.price,
    });
    state.booksInCart.push(book);
    state.totalPrice = state.totalPrice + book.price;

    return;
  }

  for (let i = 0; i < state.booksInCart.length; i++) {
    if (state.booksInCart[i].id == book.id) {
      state.booksInCart.push(book);
      state.totalPrice = state.totalPrice + book.price;
      for (let j = 0; j < state.booksToShow.length; j++) {
        if (state.booksToShow[j].book.id == book.id) {
          state.booksToShow[j].commonPrice =
            state.booksToShow[j].commonPrice + book.price;
          state.booksToShow[j].quantity = state.booksToShow[j].quantity + 1;

          return;
        }
      }
    }
  }

  state.booksInCart.push(book);
  state.booksToShow.push({
    book: book,
    quantity: 1,
    commonPrice: book.price,
  });
  state.totalPrice = state.totalPrice + book.price;
}

function removeBookFromCart(state: CartStoreType, book: BookType) {
  if (state.booksInCart.length == 0) {
    return;
  }

  for (let i = 0; i < state.booksInCart.length; i++) {
    if (state.booksInCart[i].id == book.id) {
      state.booksInCart.splice(i, 1);
      state.totalPrice = state.totalPrice - book.price;

      /* if (state.booksInCart.length == 0) {state.totalPrice = 0} */

      for (let j = 0; j < state.booksToShow.length; j++) {
        if (state.booksToShow[j].book.id == book.id) {
          if (state.booksToShow[j].quantity == 1) {
            state.booksToShow.splice(j, 1);
          } else {
            state.booksToShow[j].quantity = state.booksToShow[j].quantity - 1;
            state.booksToShow[j].commonPrice =
              state.booksToShow[j].commonPrice - book.price;
          }
        }
      }

      return;
    }
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.booksInCart = [];
      state.totalPrice = 0;
      state.booksToShow = [];
    },

    addToCart: (state, action) => {
      addBookToCart(state, action.payload);
    },

    removeFromCart: (state, action) => {
      removeBookFromCart(state, action.payload);
    },
  },
});

export const { clearCart, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
