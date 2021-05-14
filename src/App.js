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
        <p><a href="https://github.com/DinaMuktubayeva/todo-list">Source code</a></p>
        <p>Author: Dina Muktubayeva</p>        
        <p>2021</p>        
      </footer>
    </div>
  );
}

export default App;
