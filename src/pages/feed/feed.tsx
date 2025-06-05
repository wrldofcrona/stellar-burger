import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

import {
  selectLiveOrdersState,
  fetchLiveOrders
} from '../../services/slices/liveOrdersSlice/liveOrdersSlice';

export const Feed: FC = () => {
  const { liveOrders, isLoading } = useAppSelector(selectLiveOrdersState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLiveOrders());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={liveOrders}
      handleGetFeeds={() => dispatch(fetchLiveOrders())}
    />
  );
};
