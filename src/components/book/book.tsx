import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import Image from "next/image";
import styles from "./book.module.scss";
import Star from "../star/star";
import YStar from "../star/ystar";
import { DOLLAR_CURRENCY } from "../config";

export type BookProps = {
  bookInfo: BookInfoType;
};

export type BookInfoType = {
  id: string;
  accessInfo: object;
  saleInfo: {
    listPrice: {
      amount: number | null;
    };
  };
  searchInfo: object;
  volumeInfo: {
    authors: string[];
    averageRating: number;
    description: string;
    imageLinks: {
      thumbnail: string;
    };
    ratingsCount: number;
    title: string;
  };
};

export default function Book(bookInfo: BookProps) {
  const estar = <Star />;
  const ylwStar = <YStar />;
  const dispatch = useDispatch();
  const fullRating = [estar, estar, estar, estar, estar];

  const price = bookInfo.bookInfo.saleInfo.listPrice;
  let dollars: string;
  let priceRaw: number;

  let ratingsCount: number | null;

  if (bookInfo.bookInfo.volumeInfo.ratingsCount) {
    ratingsCount = bookInfo.bookInfo.volumeInfo.ratingsCount;
  } else {
    ratingsCount = 0;
  }

  let currentBookRating: number;

  if (bookInfo.bookInfo.volumeInfo.averageRating) {
    currentBookRating = bookInfo.bookInfo.volumeInfo.averageRating;
  } else {
    currentBookRating = 0;
  }

  if (!price) {
    dollars = "No price";
    priceRaw = 0;
  } else {
    if (!price.amount) {
      dollars = "No price";
      priceRaw = 0;
    } else {
      dollars = "$" + (price.amount / DOLLAR_CURRENCY).toFixed(2);
      priceRaw = price.amount / DOLLAR_CURRENCY;
    }
  }

  function descriptionTrunc(text: string) {
    //обрезка описания книги

    const currentWidth = document.documentElement.clientWidth;
    let limit = 70;
    if (currentWidth < 1100) {
      limit = 30;
    }
    if (!!text) {
      text = text.trim();
      if (text.length <= limit) return text;
      text = text.slice(0, limit);
      return text.trim() + "...";
    } else {
      return "No description";
    }
  }

  function titleTrunc(text: string) {
    //обрезка названия книги

    const currentWidth = document.documentElement.clientWidth;
    let limit = 30;
    if (currentWidth < 1100) {
      limit = 10;
    }

    if (!!text) {
      text = text.trim();
      if (text.length <= limit) return text;
      text = text.slice(0, limit);
      return text.trim() + "...";
    } else {
      return "No title";
    }
  }

  function authorsEnum(authors: string[]) {
    //перечисление авторов через запятую с новой строки

    let authorsList: string = "";

    if (!authors) {
      authorsList = "No author";
      return authorsList;
    }

    if (authors.length > 1) {
      for (let i = 0; i < authors.length; i++) {
        authorsList = authorsList + authors[i] + ", \n";
      }
      // чтобы убрать автоматически добавленную запятую после последнего автора в списке:
      authorsList = authorsList.slice(0, -7);
    } else {
      authorsList = authors[0];
    }
    return authorsList;
  }

  const autorsString: string = authorsEnum(
    bookInfo.bookInfo.volumeInfo.authors
  );

  function createRatingStars(rating: number) {
    for (let j = 0; j < rating; j++) {
      fullRating[j] = ylwStar;
    }

    return fullRating;
  }

  function BuyButtonHandler() {
    dispatch(
      addToCart({
        title: titleTrunc(bookInfo.bookInfo.volumeInfo.title),
        authors: autorsString,
        rating: currentBookRating,
        reviews: ratingsCount,
        image: bookInfo.bookInfo.volumeInfo.imageLinks.thumbnail,
        price: priceRaw,
        id: bookInfo.bookInfo.id,
      })
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.card__cover}>
        <div className={styles.cover__image_container}>
          <Image
            className={styles.card__cover_img}
            src={bookInfo.bookInfo.volumeInfo.imageLinks.thumbnail}
            alt="book cover"
            width={200}
            height={300}
          />
        </div>
      </div>
      <div className={styles.card__info}>
        <div className={styles.card__info_container}>
          <div className={styles.card__author}>
            <p className={styles.card__author_txt}>{autorsString}</p>
          </div>
          <div className={styles.card__title}>
            <p className={styles.card__title_txt}>
              {titleTrunc(bookInfo.bookInfo.volumeInfo.title)}
            </p>
          </div>
          <div className={styles.card__rating_container}>
            <div className={styles.card__rating}>
              {createRatingStars(currentBookRating).map((item, i) => (
                <div key={i}>{item}</div>
              ))}
            </div>
            <div className={styles.card__review}>
              <p className={styles.card__review_txt}> {ratingsCount} review</p>
            </div>
          </div>
          <div className={styles.card__description}>
            <p className={styles.card__description_txt}>
              {descriptionTrunc(bookInfo.bookInfo.volumeInfo.description)}
            </p>
          </div>
          <div className={styles.card__price}>
            <p className={styles.card__price_txt}>{dollars}</p>
          </div>
          <button onClick={BuyButtonHandler} className={styles.card__buy_btn}>
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}
