import accountReducer, {
  initialState,
  loginAccount,
  logoutAccount,
  registerAccount,
  fetchCurrentUser,
  updateAccountInfo,
  fetchUserOrders
} from './TAccountSlice';

import { TOrder } from '@utils-types';

const mockUser = {
  name: 'Test User',
  email: 'test@example.com'
};

describe('TAccountSlice', () => {
  it('должен возвращать initial state по умолчанию', () => {
    expect(accountReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('обрабатывает registerAccount.fulfilled', () => {
    const state = accountReducer(initialState, {
      type: registerAccount.fulfilled.type,
      payload: { user: mockUser }
    });

    expect(state.currentUser).toEqual(mockUser);
    expect(state.isLoggedIn).toBe(true);
    expect(state.authError).toBeNull();
  });

  it('обрабатывает loginAccount.fulfilled', () => {
    const state = accountReducer(initialState, {
      type: loginAccount.fulfilled.type,
      payload: { user: mockUser }
    });

    expect(state.currentUser).toEqual(mockUser);
    expect(state.isLoggedIn).toBe(true);
    expect(state.authError).toBeNull();
  });

  it('обрабатывает logoutAccount.fulfilled', () => {
    const loggedInState = {
      ...initialState,
      isLoggedIn: true,
      currentUser: mockUser
    };

    const state = accountReducer(loggedInState, {
      type: logoutAccount.fulfilled.type
    });

    expect(state.isLoggedIn).toBe(false);
    expect(state.currentUser).toBeNull();
  });

  it('обрабатывает fetchCurrentUser.fulfilled', () => {
    const state = accountReducer(initialState, {
      type: fetchCurrentUser.fulfilled.type,
      payload: { user: mockUser }
    });

    expect(state.currentUser).toEqual(mockUser);
    expect(state.isLoggedIn).toBe(true);
  });

  it('обрабатывает updateAccountInfo.fulfilled', () => {
    const state = accountReducer(initialState, {
      type: updateAccountInfo.fulfilled.type,
      payload: { user: mockUser }
    });

    expect(state.authResponse).toEqual(mockUser);
    expect(state.authError).toBeNull();
  });

  it('обрабатывает fetchUserOrders.fulfilled', () => {
    const mockOrders: TOrder[] = [
      {
        _id: '123',
        ingredients: [],
        status: 'done',
        name: 'Test Burger',
        createdAt: '',
        updatedAt: '',
        number: 1
      }
    ];

    const state = accountReducer(initialState, {
      type: fetchUserOrders.fulfilled.type,
      payload: mockOrders
    });

    expect(state.personalOrders).toEqual(mockOrders);
  });
});
