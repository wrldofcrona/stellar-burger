import reducer, { initialState } from './liveOrdersSlice';
import { fetchLiveOrders } from './liveOrdersSlice';

describe('liveOrdersSlice', () => {
  it('handles loading', () => {
    const state = reducer(initialState, { type: fetchLiveOrders.pending.type });
    expect(state.isLoading).toBe(true);
  });

  it('stores orders on success', () => {
    const payload = { orders: [{ number: 1 }], total: 10, totalToday: 2 };
    const state = reducer(initialState, { type: fetchLiveOrders.fulfilled.type, payload });
    expect(state.liveOrders).toEqual(payload.orders);
    expect(state.totalCompleted).toBe(10);
  });

  it('stores error on fail', () => {
    const state = reducer(initialState, { type: fetchLiveOrders.rejected.type, error: { message: 'fail' } });
    expect(state.fetchError).toBe('fail');
  });
});