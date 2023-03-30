import { useEffect, useState } from 'react';
import './App.scss';
import Input from './components/common/input/Input';

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

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Input
        id="input"
        onChange={e => setLogin(e.target.value)}
        value={login}
        type="text"
        placeholder="login"
      />
      <Input
        id="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="password"
        errorText="wrong password"
        error={true}
      />
    </>
  );
}

export default App;
