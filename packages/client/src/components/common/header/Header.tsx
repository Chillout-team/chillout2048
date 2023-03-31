import cls from './Header.module.scss';

type Props = {
  extraClass?: string;
  children?: React.ReactNode;
};

export const Header = (props: Props) => {
  const { children, extraClass = '' } = props;
  return <header className={cls.header + ' ' + extraClass}>{children}</header>;
};
