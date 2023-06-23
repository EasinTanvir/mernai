import { configureStore } from "@reduxjs/toolkit";
import { admindReducer, authReducer, extraIdReducer } from "./reducers/auth";
import { errorReducer } from "./reducers/error";
import { voiceReducers } from "./reducers/textVoice";

const userData = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {};

const userId = localStorage.getItem("userId")
  ? JSON.parse(localStorage.getItem("userId"))
  : null;

const INITIL_REDUCER = {
  auth: { user: userData },
  extra: { user: userId },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    extra: extraIdReducer,
    error: errorReducer,
    voice: voiceReducers,
    admins: admindReducer,
  },
  preloadedState: INITIL_REDUCER,
});
