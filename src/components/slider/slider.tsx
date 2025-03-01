"use client";
import styles from "./slider.module.scss";
import Image from "next/image";
import banner1 from "../../../public/banner1_prog.jpg";
import banner2 from "../../../public/banner2_prog.jpg";
import banner3 from "../../../public/banner3_prog.jpg";
import changeBanner from "../../../public/banner_change_prog.jpg";
import topBanner from "../../../public/banner_top_prog.jpg";

import { useState, useEffect } from "react";

export default function Slider() {
  const banners = [banner1, banner2, banner3];

  const [active, setActive] = useState(0);

  const handlerBannerChange = (key: number) => {
    setActive(key);
  };

  function autoChange() {
    let timer;
    let index = 0;
    clearInterval(timer);
    timer = setInterval(() => {
      index++;
      if (index >= banners.length) {
        index = 0;
      }
      setActive(index);
    }, 3000);
  }

  useEffect(() => {
    autoChange();
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.hero__slider_block}>
        <div className={styles.hero__slider}>
          {banners.map((item, i) => (
            <Image
              key={i}
              className={
                active == i ? styles.hero__banner_img : styles.slider_inactive
              }
              src={banners[i]}
              alt="banner"
              priority={false}
            />
          ))}
        </div>

        <div className={styles.hero__adv_banner}>
          <a href="*">
            <Image
              className={
                styles.hero__adv_banner + " " + styles.hero__adv_banner1
              }
              src={changeBanner}
              alt="banner"
            />
          </a>
        </div>
        <div className="hero__adv-banner">
          <a href="*">
            <Image
              className={
                styles.hero__adv_banner + " " + styles.hero__adv_banner2
              }
              src={topBanner}
              alt="banner"
            />
          </a>
        </div>
      </div>
      <div className={styles.hero__pointers_block}>
        {banners.map((item, i) => (
          <button
            key={i}
            className={
              active == i ? styles.banner_pointer : styles.inactive_pointer
            }
            onClick={() => handlerBannerChange(i)}
          ></button>
        ))}
      </div>
    </section>
  );
}
