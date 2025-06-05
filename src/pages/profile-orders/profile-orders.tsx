import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import {
  fetchUserOrders,
  selectAccountState
} from '../../services/slices/TAccountSlice/TAccountSlice';
import { fetchLiveOrders } from '../../services/slices/liveOrdersSlice/liveOrdersSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const { personalOrders, isLoading } = useAppSelector(selectAccountState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserOrders());
    dispatch(fetchLiveOrders());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={personalOrders} />;
};
