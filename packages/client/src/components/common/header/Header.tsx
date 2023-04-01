import cls from './Header.module.scss';
import { Link } from "react-router-dom";

type Props = {
  isAuth: boolean;
  userName?: string;
  extraClass?: string;
};

export const Header = (props: Props) => {
  const { isAuth, userName, extraClass = '' } = props;

  if ( isAuth) {
    return <header className={cls.header + ' ' + extraClass}>
        <nav>
          <div>
            <Link to={'/'}>Домой</Link>
            <Link to={'/'}>Форум</Link>
            <Link to={'/'}>Рейтинг</Link>
          </div>
          <div>
            <Link to={'/profile'} className={cls.link_user}>
              <div><img /></div>
              {userName}
            </Link>
            <Link to={'/'}>Выйти</Link>
          </div>
        </nav>
      </header>;
  }
  return <header className={cls.header + ' ' + extraClass}>
    <nav>
      <div>
        <Link to={'/'}>Форум</Link>
        <Link to={'/'}>Рейтинг</Link>
      </div>
      <div>
        <Link to={'/'}>Зарегистрироваться</Link>
        <Link to={'/'}>Войти</Link>
      </div>
    </nav>
  </header>;
};
