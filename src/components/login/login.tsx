"use client";

import styles from "./login.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { RootDispatch } from "../../store/store";
import { authorizeUser } from "@/store/authSlice";

export default function Login() {
  const dispatch = useDispatch<RootDispatch>();

  const [loginDataEmail, setEmail] = useState("");
  const [loginDataPassword, setPassword] = useState("");

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    const body = {
      email: loginDataEmail,
      password: loginDataPassword,
    };
    dispatch(authorizeUser(body));
  }

  return (
    <div className={styles.container}>
      <h1>Log in</h1>
      <form
        className={styles.mainForm}
        onSubmit={(event) => {
          handleLogin(event);
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          className={styles.emailInput}
          placeholder="example@mail.com"
          value={loginDataEmail}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          className={styles.passwordInput}
          placeholder="•••••••••"
          value={loginDataPassword}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loginDataPassword.length < 6 ? (
          <div className={styles.error}>
            Your password must be at least 6 characters long
          </div>
        ) : (
          <></>
        )}

        {loginDataPassword.length > 9 ? (
          <div className={styles.error}>
            Your password must be less than 9 characters long
          </div>
        ) : (
          <></>
        )}

        <button className={styles.logBtn} type="submit">
          log in
        </button>
      </form>
    </div>
  );
}
