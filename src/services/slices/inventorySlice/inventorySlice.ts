import { getIngredientsApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export type TInventoryState = {
  inventoryItems: TIngredient[];
  isLoading: boolean;
  fetchError: string | null;
};

export const initialState: TInventoryState = {
  inventoryItems: [],
  isLoading: false,
  fetchError: null
};

export const fetchInventory = createAsyncThunk(
  'inventory/fetchAll',
  getIngredientsApi
);

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  selectors: {
    selectInventoryState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.isLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchError = action.error.message as string;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fetchError = null;
        state.inventoryItems = action.payload;
      });
  }
});

export const { selectInventoryState } = inventorySlice.selectors;
export default inventorySlice.reducer;
