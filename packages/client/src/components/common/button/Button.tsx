import ButtonInterface from '../../../types/ButtonType.ts';
import cls from './Button.module.scss';

export default (payload: ButtonInterface) => {
  return (
    <button
      {...payload}
      className={
        cls.button +
        ' ' +
        cls[`__${payload.size}`] +
        ' ' +
        cls[`__${payload.color}`]
      }>
      {payload.children}
    </button>
  );
};
