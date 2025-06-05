import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useAppSelector } from '../../services/hooks';
import { selectLiveOrdersState } from '../../services/slices/liveOrdersSlice/liveOrdersSlice';

const extractOrderNumbers = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((order) => order.status === status)
    .map((order) => order.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const { liveOrders, totalCompleted, completedToday } = useAppSelector(
    selectLiveOrdersState
  );

  const readyOrders = extractOrderNumbers(liveOrders, 'done');
  const pendingOrders = extractOrderNumbers(liveOrders, 'pending');

  const feed = {
    orders: liveOrders,
    total: totalCompleted,
    totalToday: completedToday
  };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
