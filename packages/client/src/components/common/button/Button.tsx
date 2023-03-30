import cls from './Button.module.scss';

interface ButtonInterface
  extends Omit<React.HTMLProps<HTMLButtonElement>, 'size'> {
  onClick: () => void;
  size: 'small' | 'medium' | 'big';
  color: 'green' | 'orange' | 'red' | 'yellow';
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button = (payload: ButtonInterface) => {
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
