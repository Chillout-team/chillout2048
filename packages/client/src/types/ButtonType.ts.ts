interface ButtonInterface
  extends Omit<React.HTMLProps<HTMLButtonElement>, 'size'> {
  onClick: () => void;
  size: 'small' | 'medium' | 'big';
  color: 'green' | 'orange' | 'red' | 'yellow';
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default ButtonInterface;
