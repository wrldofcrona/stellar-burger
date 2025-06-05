import { orderBurgerApi } from '../../../utils/burger-api';
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export type TBurgerBuilderState = {
  isLoading: boolean;
  builderData: {
    selectedBun: TConstructorIngredient | null;
    filling: TConstructorIngredient[];
  };
  isOrdering: boolean;
  orderDetails: TOrder | null;
  fetchError: string | null;
};

export const initialState: TBurgerBuilderState = {
  isLoading: false,
  builderData: {
    selectedBun: null,
    filling: []
  },
  isOrdering: false,
  orderDetails: null,
  fetchError: null
};

export const submitBurgerOrder = createAsyncThunk(
  'burger/submitOrder',
  async (ingredientIds: string[]) => orderBurgerApi(ingredientIds)
);

export const burgerBuilderSlice = createSlice({
  name: 'burgerBuilder',
  initialState,
  selectors: {
    selectBurgerBuilder: (state) => state
  },
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.builderData.selectedBun = action.payload;
        } else {
          state.builderData.filling.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const uniqueId = nanoid();
        return { payload: { ...ingredient, id: uniqueId } };
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.builderData.filling = state.builderData.filling.filter(
        (item) => item.id !== action.payload
      );
    },
    moveItemUp: (state, action: PayloadAction<number>) => {
      state.builderData.filling.splice(
        action.payload,
        0,
        state.builderData.filling.splice(action.payload - 1, 1)[0]
      );
    },
    moveItemDown: (state, action: PayloadAction<number>) => {
      state.builderData.filling.splice(
        action.payload,
        0,
        state.builderData.filling.splice(action.payload + 1, 1)[0]
      );
    },
    toggleOrderRequest: (state, action) => {
      state.isOrdering = action.payload;
    },
    clearOrderDetails: (state) => {
      state.orderDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitBurgerOrder.pending, (state) => {
        state.isLoading = true;
        state.isOrdering = true;
        state.fetchError = null;
      })
      .addCase(submitBurgerOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isOrdering = false;
        state.fetchError = action.error.message as string;
      })
      .addCase(submitBurgerOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isOrdering = false;
        state.fetchError = null;
        state.orderDetails = action.payload.order;
        state.builderData = {
          selectedBun: null,
          filling: []
        };
        console.log(action.payload);
      });
  }
});

export const {
  addItem,
  removeItem,
  moveItemUp,
  moveItemDown,
  toggleOrderRequest,
  clearOrderDetails
} = burgerBuilderSlice.actions;

export const { selectBurgerBuilder } = burgerBuilderSlice.selectors;
export default burgerBuilderSlice.reducer;
