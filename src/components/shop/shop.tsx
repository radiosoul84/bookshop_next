"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "../../store/store";
import {
  getBooks,
  clearLoadedBooks,
  setCategory,
  setStartIndex,
} from "../../store/booksSlice";
import { BookInfoType } from "../book/book";
import { DEFAULT_MAX_RESULTS_BOOKS_LOADING, GENRES_LIST } from "../config";
import styles from "./shop.module.scss";
import Book from "../book/book";

export default function Shop() {
  const dispatch = useDispatch<RootDispatch>();

  const books: BookInfoType[] = useSelector(
    (state: RootState) => state.books.books
  );

  const activeCategory: string = useSelector(
    (state: RootState) => state.books.activeCategory
  );

  const startIndex: number = useSelector(
    (state: RootState) => state.books.lastCounter
  );

  const showLoader: boolean = useSelector(
    (state: RootState) => state.books.loader
  );

  const parameters = {
    activeCategory: activeCategory,
    startIndex: startIndex,
  };

  function categoryHandler(category: string) {
    dispatch(setCategory(category));
    dispatch(clearLoadedBooks());
    parameters.activeCategory = category;
    parameters.startIndex = 0;
    dispatch(setStartIndex(0));
    console.log(parameters);
    dispatch(getBooks(parameters));
  }

  function addMoreHandler() {
    parameters.startIndex = startIndex + DEFAULT_MAX_RESULTS_BOOKS_LOADING;
    dispatch(setStartIndex(parameters.startIndex));
    dispatch(getBooks(parameters));
  }

  useEffect(() => {
    dispatch(clearLoadedBooks());
    dispatch(setStartIndex(0));
    parameters.startIndex = 0;
    dispatch(getBooks(parameters));
  }, [dispatch]);

  return (
    <section className={styles.shop}>
      <div className={styles.genres}>
        <div className={styles.genres__block}>
          <li className={styles.genres__list}>
            {GENRES_LIST.map((item, i) => (
              <ul className={styles.genres__list_item} key={i}>
                {item == activeCategory ? (
                  <div className={styles.genre_pointer}></div>
                ) : (
                  <></>
                )}

                <button
                  className={
                    item == activeCategory
                      ? styles.activeButton
                      : styles.genres__list_btn
                  }
                  onClick={() => {
                    categoryHandler(item);
                  }}
                >
                  {item}
                </button>
              </ul>
            ))}
          </li>
        </div>
      </div>
      <div className={styles.books}>
        <div className={styles.books__block}>
          {showLoader ? <div className={styles.loader}>Loading...</div> : <></>}
          {books.map((book, i) => (
            <Book bookInfo={book} key={i} />
          ))}
        </div>

        {showLoader ? (
          <></>
        ) : (
          <button className={styles.shop__more_btn} onClick={addMoreHandler}>
            LOAD MORE
          </button>
        )}
      </div>
    </section>
  );
}
