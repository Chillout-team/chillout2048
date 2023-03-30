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

export default InputInterface;
