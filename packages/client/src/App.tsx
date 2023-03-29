import { useEffect } from 'react';
import './App.scss';
import Button from './components/common/button/Button';

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
  return <Button>button</Button>;
}

export default App;
