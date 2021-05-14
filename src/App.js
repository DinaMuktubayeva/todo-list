import { useEffect, useState } from 'react';
import './App.css';
import List from './components/List'

function App() {
  const [list, setList] = useState([])

  useEffect(() => {
    console.log(list)
  }, [list])

  return (
    <div className="App">
      <List list={list} setList={setList} />
      <footer>
        <p>
          <a href="https://github.com/DinaMuktubayeva/todo-list" target="_blank" rel="noreferrer">
            Source code
          </a>
        </p>
        <p>Author: Dina Muktubayeva (<a href="mailto:dina.muktubayeva@email.com">mail</a>)</p>
        <p>2021</p>
      </footer>
    </div>
  );
}

export default App;
