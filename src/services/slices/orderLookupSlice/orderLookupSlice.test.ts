import reducer, { initialState } from './orderLookupSlice';
import { fetchOrderDetails } from './orderLookupSlice';

describe('orderLookupSlice', () => {
  it('sets fetching true on pending', () => {
    const state = reducer(initialState, { type: fetchOrderDetails.pending.type });
    expect(state.isFetching).toBe(true);
  });

  it('sets orderDetails on success', () => {
    const payload = { orders: [{ number: 111 }] };
    const state = reducer(initialState, { type: fetchOrderDetails.fulfilled.type, payload });
    expect(state.orderDetails?.number).toBe(111);
  });

  it('sets error on failure', () => {
    const state = reducer(initialState, { type: fetchOrderDetails.rejected.type, error: { message: 'error' } });
    expect(state.fetchError).toBe('error');
  });
});