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
  return (
    <div
      className={
        props.error
          ? cls.input_container + ' ' + cls.__error
          : cls.input_container
      }>
      <input className={cls.input} {...props} placeholder=" " />

      {props.placeholder && (
        <label className={cls.placeholder} htmlFor={props.id}>
          {props.placeholder}
        </label>
      )}

      {props.errorText && (
        <label className={cls.input_error}>{props.errorText}</label>
      )}
    </div>
  );
};
