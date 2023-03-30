import cls from './Input.module.scss';
import InputInterface from '../../../types/InputType';

export default (payload: InputInterface) => {
  return (
    <div
      className={
        payload.error
          ? cls.input_container + ' ' + cls.__error
          : cls.input_container
      }>
      <input className={cls.input} {...payload} placeholder=" " />

      {payload.placeholder ? (
        <label className={cls.placeholder} htmlFor={payload.id}>
          {payload.placeholder}
        </label>
      ) : (
        <></>
      )}

      {payload.errorText ? (
        <label className={cls.input_error}>{payload.errorText}</label>
      ) : (
        <></>
      )}
    </div>
  );
};
