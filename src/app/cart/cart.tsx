"use client";

import styles from "./cart.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

import {
  addToCart,
  removeFromCart,
  clearCart,
  BookType,
} from "@/store/cartSlice";
import Star from "@/components/star/star";
import YStar from "@/components/star/ystar";



export default function CartPage() {
  const estar = <Star />;
  const ylwStar = <YStar />;
  const dispatch = useDispatch();
  const booksToShow = useSelector((state: RootState) => state.cart.booksToShow);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);


  function createRatingStars(rating: number) {
    const fullRating = [estar, estar, estar, estar, estar];
    for (let j = 0; j < rating; j++) {
      fullRating[j] = ylwStar;
    }
    return fullRating;
  }

  function clearCartHandler() {
    dispatch(clearCart());
  }

  function addHandler(book: BookType) {
    dispatch(addToCart(book));
  }

  function removeHandler(book: BookType) {
    dispatch(removeFromCart(book));
  }

  return (
    <div className={styles.container}>
     {/*  <Head>
        <title>Cart</title>
        <meta name="description" content="BookShop google books " />
        <meta name="author" content="Johnny" />
      </Head> */}
      <h1>shopping cart</h1>

      <div className={styles.cart}>
        <p>item</p>
        <p>quantity</p>
        <p>price</p>
        <p>delivery</p>
      </div>

      {booksToShow.length == 0 ? (
        <div className={styles.emptyCart}>Your cart is empty</div>
      ) : (
        <></>
      )}

      {booksToShow.map((book, i) => (
        <div key={i} className={styles.book}>
          <div className={styles.bookBlock}>
            <Image
              src={book.book.image}
              alt="book cover"
              width={200}
              height={300}
            />
            <div className={styles.bookInfo}>
              <p className={styles.title}>{book.book.title}</p>
              <p className={styles.author}>{book.book.authors}</p>
              <div className={styles.card__rating_container}>
                {createRatingStars(book.book.rating).map((star, t) => (
                  <div key={t}>{star}</div>
                ))}
                <span>{book.book.reviews} reviews</span>
              </div>
            </div>
          </div>
          <div className={styles.quantity}>
            <button
              className={styles.plus}
              onClick={() => {
                removeHandler(book.book);
              }}
            >
              -
            </button>
            <p>{book.quantity}</p>
            <button
              className={styles.plus}
              onClick={() => {
                addHandler(book.book);
              }}
            >
              +
            </button>
          </div>
          <div className={styles.price}>
            <div>${book.commonPrice.toFixed(2)}</div>
          </div>

          {book.book.price > 0 ? (
            <div className={styles.delivery}>Shipping: delivery</div>
          ) : (
            <div className={styles.delivery}>Out of stock</div>
          )}
        </div>
      ))}

      {booksToShow.length !== 0 ? (
        <div className={styles.checkoutContainer}>
          <h1 className={styles.totalPrice}>
            total price: ${totalPrice.toFixed(2)}
          </h1>
          <button className={styles.chkBtn}>checkout</button>
          <button className={styles.chkBtn} onClick={clearCartHandler}>
            clear cart
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
