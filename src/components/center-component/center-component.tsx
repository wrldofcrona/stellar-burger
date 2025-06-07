import { FC, memo, useEffect, useState } from 'react';
import { CenterComp } from '../ui/center-component';
import { TCenter } from './type';
import { useLocation } from 'react-router-dom';

export const CenteringComp: FC<TCenter> = memo(({ title, children }) => {
  const location = useLocation();
  const [titleStyle, setTitleStyle] = useState('text_type_main-large');

  useEffect(() => {
    if (/feed|profile/i.test(location.pathname)) {
      setTitleStyle('text_type_digits-default');
    }
  }, []);

  return (
    <>
      <CenterComp title={title} titleStyle={titleStyle} children={children} />
    </>
  );
});
