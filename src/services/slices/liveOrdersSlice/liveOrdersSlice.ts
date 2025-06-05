import { getFeedsApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TLiveOrdersState = {
  liveOrders: TOrder[];
  totalCompleted: number;
  completedToday: number;
  isLoading: boolean;
  fetchError: string | null;
};

export const initialState: TLiveOrdersState = {
  liveOrders: [],
  totalCompleted: 0,
  completedToday: 0,
  isLoading: false,
  fetchError: null
};

export const fetchLiveOrders = createAsyncThunk('liveOrders/fetchAll', getFeedsApi);

export const liveOrdersSlice = createSlice({
  name: 'liveOrders',
  initialState,
  reducers: {},
  selectors: {
    selectLiveOrdersState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLiveOrders.pending, (state) => {
        state.isLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchLiveOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchError = action.error.message as string;
      })
      .addCase(fetchLiveOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fetchError = null;
        state.liveOrders = action.payload.orders;
        state.totalCompleted = action.payload.total;
        state.completedToday = action.payload.totalToday;
      });
  }
});

export const { selectLiveOrdersState } = liveOrdersSlice.selectors;
export default liveOrdersSlice.reducer;
