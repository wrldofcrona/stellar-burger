import { combineReducers, configureStore } from '@reduxjs/toolkit';
import burgerBuilderSlice from './slices/burgerBuilderSlice/burgerBuilderSlice';
import liveOrdersSlice from './slices/liveOrdersSlice/liveOrdersSlice';
import accountSlice from './slices/TAccountSlice/TAccountSlice';
import inventorySlice from './slices/inventorySlice/inventorySlice';
import orderLookupSlice from './slices/orderLookupSlice/orderLookupSlice';

export const rootReducer = combineReducers({
  inventory: inventorySlice,
  orderLookup: orderLookupSlice,
  burgerBuilder: burgerBuilderSlice,
  liveOrders: liveOrdersSlice,
  account: accountSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
