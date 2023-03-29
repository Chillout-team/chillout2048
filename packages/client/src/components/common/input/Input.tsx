import cls from './Input.module.scss';

export default (payload: any) => {
  return <input className={cls.input} {...payload} />;
};
