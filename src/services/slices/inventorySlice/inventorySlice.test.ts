import reducer, { initialState } from './inventorySlice';
import { fetchInventory } from './inventorySlice';

describe('inventorySlice', () => {
  it('sets isLoading to true on pending', () => {
    const state = reducer(initialState, { type: fetchInventory.pending.type });
    expect(state.isLoading).toBe(true);
  });

  it('sets items on fulfilled', () => {
    const mockItems = [{ _id: '1', name: 'Test', type: 'main' }];
    const state = reducer(initialState, { type: fetchInventory.fulfilled.type, payload: mockItems });
    expect(state.inventoryItems).toEqual(mockItems);
  });

  it('sets error on rejected', () => {
    const state = reducer(initialState, { type: fetchInventory.rejected.type, error: { message: 'Error' } });
    expect(state.fetchError).toBe('Error');
  });
});