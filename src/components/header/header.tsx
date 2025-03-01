"use client";

import styles from "./header.module.scss";
import Image from "next/image";
import logo from "../../../public/logo.png";
import profile from "../../../public/profile.png";
import loggedProfile from "../../../public/profile_logged.png";
import search from "../../../public/search.png";
import cart from "../../../public/cart.png";
import Login from "../login/login";
import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function Header() {
  const navi = ["books", "audiobooks", "stationery & gifts", "blog"];

  const [showLogin, toggleLogin] = useState(false);
  const [active, setActive] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthorized);

  const inCart = useSelector(
    (state: RootState) => state.cart.booksInCart.length
  );

  function loginHandler() {
    if (!isLoggedIn) {
      toggleLogin(!showLogin);
    } else {
      toggleLogin(false);
    }
  }

  function goHomeHandler() {
    setActive(0);
  }

  function activeSectionHandler(section: string, i: number) {
    setActive(i);
    let route: string = "";
    switch (section) {
      case "books":
        route = "";
        break;
      case "audiobooks":
        route = "audiobooks";
        break;
      case "stationery & gifts":
        route = "stationery";
        break;
      case "blog":
        route = "blog";
        break;
    }

    router.push(`/${route}`);
  }

  return (
    <header className={styles.header}>
      <div className={styles.header_block}>
        <Link href="/">
          <button onClick={goHomeHandler} className={styles.header__logo}>
            <Image
              className={styles.header__logo}
              src={logo}
              priority={false}
              alt="logo"
            />
          </button>
        </Link>
        <nav className={styles.header__navi}>
          <ul className={styles.navi__list}>
            {navi.map((item, i) => (
              <li key={i} className={styles.navi__list_item}>
                <button
                  onClick={() => activeSectionHandler(item, i)}
                  className={styles.header__btn}
                >
                  <p
                    className={
                      pathname == "/" && i == 0
                        ? styles.navi__list_item_txt_active
                        : active == i && pathname !== "/"
                        ? styles.navi__list_item_txt_active
                        : styles.navi__list_item_txt
                    }
                  >
                    {item}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.header__userblock}>
          <Link href={isLoggedIn ? "/profile" : ""}>
            <button
              onClick={loginHandler}
              className={
                styles.userblock__profile +
                " " +
                styles.header__btn +
                " " +
                styles.userblock__btn
              }
            >
              <Image
                className={styles.userblock__search_icon}
                src={isLoggedIn ? loggedProfile : profile}
                alt="profile"
              />
            </button>
          </Link>
          <button
            className={
              styles.userblock__search +
              " " +
              styles.header__btn +
              " " +
              styles.userblock__btn
            }
          >
            <Image
              className={styles.userblock__search_icon}
              src={search}
              alt="search"
            />
          </button>

          <Link href="/cart">
            <button
              className={
                styles.userblock__cart +
                " " +
                styles.header__btn +
                " " +
                styles.userblock__btn
              }
            >
              <Image
                className={styles.userblock__search_icon}
                src={cart}
                alt="cart"
              />
              <div className={inCart !== 0 ? styles.in_cart : styles.hidden}>
                {inCart}
              </div>
            </button>
          </Link>
        </div>
      </div>
      {showLogin ? <Login /> : <></>}
    </header>
  );
}
