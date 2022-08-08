import { configureStore } from "@reduxjs/toolkit";
import { reducer as menuReducer } from "../components/MenuReducer";
const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
});

export default store;
