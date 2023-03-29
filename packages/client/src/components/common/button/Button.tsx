import cls from './Button.module.scss';

export default (payload: any) => {
  return (
    <button {...payload} className={cls.button}>
      {payload.children}
    </button>
  );
};
