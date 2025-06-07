import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

import { useNavigate } from 'react-router-dom';
import {
  selectBurgerBuilder,
  submitBurgerOrder,
  toggleOrderRequest,
  clearOrderDetails
} from '../../services/slices/burgerBuilderSlice/burgerBuilderSlice';
import { selectAccountState } from '../../services/slices/TAccountSlice/TAccountSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const { builderData, orderDetails, isOrdering } =
    useAppSelector(selectBurgerBuilder);
  const { isLoggedIn } = useAppSelector(selectAccountState);
  const dispatch = useAppDispatch();

  let ingredientIds: string[] = [];

  const fillingIds = builderData.filling.map((item) => item._id);

  if (builderData.selectedBun) {
    const bunId = builderData.selectedBun._id;
    ingredientIds = [bunId, ...fillingIds, bunId];
  }

  const onOrderClick = () => {
    if (isLoggedIn && builderData.selectedBun) {
      dispatch(toggleOrderRequest(true));
      dispatch(submitBurgerOrder(ingredientIds));
    } else if (!isLoggedIn) {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(toggleOrderRequest(false));
    dispatch(clearOrderDetails());
  };

  const totalPrice = useMemo(() => {
    const bunPrice = builderData.selectedBun?.price ?? 0;
    const fillingsPrice = builderData.filling.reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );
    return bunPrice * 2 + fillingsPrice;
  }, [builderData]);

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={isOrdering}
      constructorItems={builderData}
      orderModalData={orderDetails}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
