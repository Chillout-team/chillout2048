<<<<<<< HEAD
import { useEffect } from "react";
import "./App.scss";
=======
import { useEffect } from 'react';
import './App.scss';
>>>>>>> 77d268218da1dff14731f1a7c8eef8142df40446

function App() {
    useEffect(() => {
        const fetchServerData = async () => {
            const url = `http://localhost:${__SERVER_PORT__}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
        };

<<<<<<< HEAD
        fetchServerData();
    }, []);
    return <div className="App">Вот тут будет жить ваше приложение :)</div>;
=======
    fetchServerData();
  }, []);
  return <div className="App">Вот тут будет жить ваше приложение :)</div>;
>>>>>>> 77d268218da1dff14731f1a7c8eef8142df40446
}

export default App;
