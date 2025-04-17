import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import productReducer from "./products/productSlice";
import userReducer from "./user/userSlice";
import categoryReducer from "./category/categorySlice";
import loaderReducer from "./loader/loader";

// combine all reducers to one
const combinedReducers = combineReducers({
  cart: cartReducer,
  product: productReducer,
  user: userReducer,
  category: categoryReducer,
  loader: loaderReducer,
});

// configure the store
const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof combinedReducers>;

export { store };
