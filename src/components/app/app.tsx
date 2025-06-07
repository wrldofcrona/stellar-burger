import { useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../services/hooks';

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';

import { ProtectRoute } from '../protect-route/protect-route';
import { CenteringComp } from '../center-component/center-component';

import { fetchCurrentUser } from '../../services/slices/TAccountSlice/TAccountSlice';
import { fetchInventory } from '../../services/slices/inventorySlice/inventorySlice';

import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const background = location.state?.background;

  // Правильно: useSelector ВНЕ useEffect
  const inventory = useAppSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchInventory());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route
          path='/ingredients/:id'
          element={
            <CenteringComp title={'Детали ингредиента'}>
              <IngredientDetails />
            </CenteringComp>
          }
        />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <CenteringComp title={`#${location.pathname.match(/\d+/)}`}>
              <OrderInfo />
            </CenteringComp>
          }
        />
        <Route element={<ProtectRoute onlyUnAuth />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectRoute onlyUnAuth={false} />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route
            path='/profile/orders/:number'
            element={
              <CenteringComp title={`#${location.pathname.match(/\d+/)}`}>
                <OrderInfo />
              </CenteringComp>
            }
          />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={() => history.back()}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${location.pathname.match(/\d+/)}`}
                onClose={() => history.back()}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route element={<ProtectRoute onlyUnAuth={false} />}>
            <Route
              path='/profile/orders/:number'
              element={
                <Modal
                  title={`#${location.pathname.match(/\d+/)}`}
                  onClose={() => history.back()}
                >
                  <OrderInfo />
                </Modal>
              }
            />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
