import reducer, {
  addItem,
  removeItem,
  moveItemUp,
  moveItemDown,
  clearOrderDetails,
  initialState,
  TBurgerBuilderState,
} from './burgerBuilderSlice';
import { TConstructorIngredient, TOrder } from '@utils-types';

describe('burgerBuilderSlice', () => {
  const bunIngredient: TConstructorIngredient = {
    _id: '123',
    name: 'Test Bun',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 500,
    image: '',
    image_mobile: '',
    image_large: '',
    id: 'bun-1'
  };

  const mainIngredient: TConstructorIngredient = {
    ...bunIngredient,
    type: 'main',
    id: 'main-1'
  };

  it('adds bun correctly', () => {
    const state = reducer(initialState, addItem(bunIngredient));
    expect(state.builderData.selectedBun?._id).toBe('123');
  });

  it('removes item by id', () => {
    const filledState: TBurgerBuilderState = {
      ...initialState,
      builderData: {
        selectedBun: null,
        filling: [mainIngredient]
      }
    };
    const state = reducer(filledState, removeItem('main-1'));
    expect(state.builderData.filling).toHaveLength(0);
  });

  it('moves item down', () => {
    const itemA = { ...mainIngredient, id: 'a' };
    const itemB = { ...mainIngredient, id: 'b' };
    const preState: TBurgerBuilderState = {
      ...initialState,
      builderData: {
        selectedBun: null,
        filling: [itemA, itemB]
      }
    };
    const state = reducer(preState, moveItemDown(0));
    expect(state.builderData.filling[1].id).toBe('a');
  });

  it('clears order details', () => {
    const modifiedState: TBurgerBuilderState = {
      ...initialState,
      orderDetails: {
        _id: 'order1',
        number: 123,
        status: 'done',
        name: 'Test Order',
        createdAt: '',
        updatedAt: '',
        ingredients: []
      }
    };
    const state = reducer(modifiedState, clearOrderDetails());
    expect(state.orderDetails).toBeNull();
  });
});
