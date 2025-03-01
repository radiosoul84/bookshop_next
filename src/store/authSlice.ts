"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type AuthStoreType = {
  email: string;
  password: string;
  token: string;
  error: boolean;
  isAuthorized: boolean;
  loader: boolean;
};

export type BodyType = {
  email: string;
  password: string;
};

export type AuthType = {
  isAuthorized: boolean;
  email: string;
  password: string;
};

const initialState: AuthStoreType = {
  email: "",
  password: "",
  token: "",
  error: false,
  isAuthorized: false,
  loader: false,
};

export const authorizeUser = createAsyncThunk<AuthType, BodyType>(
  "auth/authorizeUser",

  async (loginData) => {
    let request = new Request("/api/auth", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
      /* body: "{\"email\": \"455m@ail.ru\",\"password\": \"4055500\"}" */
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new Error("Oops, fake server failed");
    }
    return {
      isAuthorized: true,
      email: loginData.email,
      password: loginData.password,
    };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    unauthorize: (state) => {
      state.email = "";
      state.password = "";
      state.token = "";
      state.error = false;
      state.isAuthorized = false;
      state.loader = false;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(authorizeUser.pending, (state) => {
        state.loader = true;
      })

      .addCase(
        authorizeUser.fulfilled,
        (state, action: PayloadAction<AuthType>) => {
          state.isAuthorized = action.payload.isAuthorized;
          state.email = action.payload.email;
          state.password = action.payload.password;
          state.loader = false;
        }
      )

      .addCase(authorizeUser.rejected, (state) => {
        state.error = true;
      });
  },
});

export const { unauthorize } = authSlice.actions;
export default authSlice.reducer;
