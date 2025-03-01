"use client";

import styles from "./profile.module.scss";
import Image from "next/image";
import profImg from "../../../public/profile_image.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { unauthorize } from "@/store/authSlice";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const userEmail = useSelector((state: RootState) => state.auth.email);

  const router = useRouter();
  const dispatch = useDispatch();

  function logOutHandler() {
    dispatch(unauthorize());

    router.push("/");
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.profile}>
          <h1>Profile</h1>
          <div className={styles.profile_wrapper}>
            <Image
              src={profImg}
              className={styles.profile_img}
              alt="profile photo"
            />
            <div className={styles.profileBlock}>
              <h3>Your name</h3>
              <p className={styles.name}>John Smith</p>
              <h3>your email</h3>
              <p className={styles.email}>{userEmail}</p>
            </div>
          </div>
        </div>
        <div className={styles.about}>
          <h3>about me</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            obcaecati, non debitis reprehenderit, aliquid temporibus illo minus
            iure accusamus, consequuntur aliquam nulla! Nobis, velit! Obcaecati
            labore neque molestiae eos repellat!
          </p>
        </div>
      </div>
      <button className={styles.editButton}>edit profile</button>
      <button className={styles.logoutButton} onClick={logOutHandler}>
        log out
      </button>
    </div>
  );
}
