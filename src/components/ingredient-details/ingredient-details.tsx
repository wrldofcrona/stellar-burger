import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';

import { selectInventoryState } from '../../services/slices/inventorySlice/inventorySlice';

export const IngredientDetails: FC = () => {
  const { inventoryItems } = useAppSelector(selectInventoryState);
  const { id } = useParams<{ id: string }>();

  const ingredientData = inventoryItems.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
