import cls from './Button.module.scss';

interface ButtonInterface
  extends Omit<React.HTMLProps<HTMLButtonElement>, 'size'> {
  onClick: () => void;
  size: 'small' | 'medium' | 'big';
  color: 'green' | 'orange' | 'red' | 'yellow';
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button = (props: ButtonInterface) => {
  return (
    <button
      {...props}
      className={
        cls.button +
        ' ' +
        cls[`__${props.size}`] +
        ' ' +
        cls[`__${props.color}`]
      }>
      {props.children}
    </button>
  );
};
