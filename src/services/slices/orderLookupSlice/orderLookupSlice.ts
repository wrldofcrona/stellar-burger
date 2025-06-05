import { getOrderByNumberApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../../utils/types';

type TOrderLookupState = {
  allOrders: TOrder[];
  orderDetails: TOrder | null;
  isFetching: boolean;
  rawResponse: null;
  fetchError: string | null;
};

export const initialState: TOrderLookupState = {
  allOrders: [],
  orderDetails: null,
  isFetching: false,
  rawResponse: null,
  fetchError: null
};

export const fetchOrderDetails = createAsyncThunk(
  'order/fetchByNumber',
  async (orderNumber: number) => getOrderByNumberApi(orderNumber)
);

export const orderLookupSlice = createSlice({
  name: 'orderLookup',
  initialState,
  reducers: {},
  selectors: {
    selectOrderLookupState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.fetchError = null;
        state.isFetching = true;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.fetchError = action.error.message as string;
        state.isFetching = false;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.fetchError = null;
        state.isFetching = false;
        state.orderDetails = action.payload.orders[0];
      });
  }
});

export const { selectOrderLookupState } = orderLookupSlice.selectors;
export default orderLookupSlice.reducer;
