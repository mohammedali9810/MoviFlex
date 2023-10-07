import { configureStore } from "@reduxjs/toolkit";
import favoriteArray from "./slices/favorite";
export default configureStore({
  reducer: {
    favoriteArray,
  },
});
