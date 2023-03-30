import cls from './Input.module.scss';

interface InputInterface
  extends Omit<React.HTMLProps<HTMLInputElement>, 'size'> {
  id: string;
  value: string;
  type: 'text' | 'email' | 'password';
  placeholder?: string;
  success?: boolean;
  error?: boolean;
  disabled?: boolean;
  errorText?: string;
  extraClass?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
  onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
}

export const Input = (payload: InputInterface) => {
  return (
    <div
      className={
        payload.error
          ? cls.input_container + ' ' + cls.__error
          : cls.input_container
      }>
      <input className={cls.input} {...payload} placeholder=" " />

      {payload.placeholder && (
        <label className={cls.placeholder} htmlFor={payload.id}>
          {payload.placeholder}
        </label>
      )}

      {payload.errorText && (
        <label className={cls.input_error}>{payload.errorText}</label>
      )}
    </div>
  );
};
