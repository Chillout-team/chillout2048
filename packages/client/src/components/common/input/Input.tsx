import cls from './Input.module.scss';

export default ({ type = 'text' }) => {
  return <input className={cls.input} type={type} />;
};
