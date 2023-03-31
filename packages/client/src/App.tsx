import { useEffect } from 'react';
import './App.scss';
import { Main } from './components/common/main/Main';
import { Header } from './components/common/header/Header';

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);
  return (
    <>
      <Header>
        <nav>
          <ul>
            <li>Форум</li>
            <li>Рейтинг</li>
          </ul>
        </nav>
        <nav>
          <ul>
            <li>
              <div></div>
            </li>
            <li>Зарегистрироваться</li>
            <li>Войти</li>
          </ul>
        </nav>
      </Header>
      <Main>
        <div>1</div>
        <div>2</div>
      </Main>
    </>
  );
}

export default App;
