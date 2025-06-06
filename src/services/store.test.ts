import store from './store';
import { addItem } from './slices/burgerBuilderSlice/burgerBuilderSlice';

describe('Redux Store', () => {
  it('должен инициализироваться корректно', () => {
    const state = store.getState();
    expect(state).toHaveProperty('burgerBuilder');
    expect(state).toHaveProperty('inventory');
    expect(state).toHaveProperty('liveOrders');
    expect(state).toHaveProperty('account');
    expect(state).toHaveProperty('orderLookup');
  });

  it('должен обрабатывать экшены', () => {
    const previous = store.getState().burgerBuilder.builderData.filling.length;

    const fakeIngredient = {
      _id: '123',
      name: 'Test Ingredient',
      type: 'main',
      price: 100,
      image: '',
      image_large: '',
      image_mobile: '',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100
    };

    store.dispatch(addItem(fakeIngredient));
    const next = store.getState().burgerBuilder.builderData.filling.length;

    expect(next).toBe(previous + 1);
  });
});
