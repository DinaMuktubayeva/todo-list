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
    </div>
  );
}

export default App;
