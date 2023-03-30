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

export const Input = (props: InputInterface) => {
  const { id, error, placeholder, errorText, ...other } = props;
  return (
    <div
      className={
        error ? cls.input_container + ' ' + cls.__error : cls.input_container
      }>
      <input className={cls.input} {...other} placeholder=" " />

      {placeholder && (
        <label className={cls.placeholder} htmlFor={id}>
          {placeholder}
        </label>
      )}

      {errorText && <label className={cls.input_error}>{errorText}</label>}
    </div>
  );
};
