import {
  TRegisterData,
  loginUserApi,
  TLoginData,
  getUserApi,
  getOrdersApi,
  logoutApi,
  updateUserApi,
  registerUserApi
} from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../../utils/cookie';
import { TOrder, TUser } from '@utils-types';

type TAccountState = {
  isLoading: boolean;
  authError: string | null;
  authResponse: TUser | null;
  registrationInfo: TRegisterData | null;
  currentUser: TUser | null;
  hasCheckedAuth: boolean;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  personalOrders: TOrder[];
};

export const initialState: TAccountState = {
  isLoading: false,
  authError: null,
  authResponse: null,
  registrationInfo: null,
  currentUser: null,
  hasCheckedAuth: false,
  isLoggedIn: false,
  isLoggingIn: false,
  personalOrders: []
};

export const registerAccount = createAsyncThunk(
  'account/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginAccount = createAsyncThunk(
  'account/login',
  async ({ email, password }: TLoginData) => {
    const result = await loginUserApi({ email, password });
    if (!result.success) {
      return result;
    }
    setCookie('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);
    return result;
  }
);

export const fetchCurrentUser = createAsyncThunk('account/fetchUser', getUserApi);

export const fetchUserOrders = createAsyncThunk('account/fetchOrders', getOrdersApi);

export const updateAccountInfo = createAsyncThunk(
  'account/update',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const logoutAccount = createAsyncThunk('account/logout', async () => {
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
  });
});

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.currentUser = null;
    },
    clearAuthError: (state) => {
      state.authError = null;
    }
  },
  selectors: {
    selectAccountState: (state) => state,
    selectAuthError: (state) => state.authError
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAccount.pending, (state) => {
        state.isLoading = true;
        state.authError = null;
        state.hasCheckedAuth = true;
        state.isLoggedIn = false;
      })
      .addCase(registerAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.authError = action.error.message as string;
        state.hasCheckedAuth = false;
      })
      .addCase(registerAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authError = null;
        state.authResponse = action.payload.user;
        state.currentUser = action.payload.user;
        state.hasCheckedAuth = false;
        state.isLoggedIn = true;
      })
      .addCase(loginAccount.pending, (state) => {
        state.isLoggingIn = true;
        state.authError = null;
        state.hasCheckedAuth = true;
        state.isLoggedIn = false;
      })
      .addCase(loginAccount.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.hasCheckedAuth = false;
        state.authError = action.error.message as string;
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        state.authError = null;
        state.isLoggingIn = false;
        state.hasCheckedAuth = false;
        state.isLoggedIn = true;
        state.currentUser = action.payload.user;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoggedIn = true;
        state.hasCheckedAuth = true;
        state.isLoggingIn = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.hasCheckedAuth = false;
        state.isLoggingIn = false;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isLoggingIn = false;
        state.currentUser = action.payload.user;
        state.hasCheckedAuth = false;
      })
      .addCase(updateAccountInfo.pending, (state) => {
        state.isLoading = true;
        state.authError = null;
      })
      .addCase(updateAccountInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.authError = action.error.message as string;
      })
      .addCase(updateAccountInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authError = null;
        state.authResponse = action.payload.user;
      })
      .addCase(logoutAccount.pending, (state) => {
        state.isLoggedIn = true;
        state.hasCheckedAuth = true;
        state.authError = null;
        state.isLoading = true;
      })
      .addCase(logoutAccount.rejected, (state, action) => {
        state.isLoggedIn = true;
        state.hasCheckedAuth = false;
        state.authError = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(logoutAccount.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.hasCheckedAuth = false;
        state.authError = null;
        state.isLoading = false;
        state.currentUser = null;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.authError = null;
        state.isLoading = true;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.authError = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.authError = null;
        state.isLoading = false;
        state.personalOrders = action.payload;
      });
  }
});

export const { clearUserData, clearAuthError } = accountSlice.actions;
export const { selectAccountState, selectAuthError } = accountSlice.selectors;
export default accountSlice.reducer;
