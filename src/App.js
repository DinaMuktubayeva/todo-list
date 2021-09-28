import { useEffect, useState } from 'react';
import './App.css';
import './theme.scss'
import List from './components/List'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [list, setList] = useState([])
  const [theme, setTheme] = useState('light')

  // on first render, load list from localStorage, if it's there
  useEffect(() => {
    const json = localStorage.getItem('list')
    const savedList = JSON.parse(json)
    if (savedList)
      setList(savedList)
  }, [])

  // save notes locally
  useEffect(() => {
    const json = JSON.stringify(list)
    localStorage.setItem('list', json)
  }, [list])

  useEffect(() => {
    const darkOS = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(darkOS ? "dark" : "light");
  }, []);

  return (
    <div className={`App ${theme}`}>
      <div className='icon-sun' onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}>
        <FontAwesomeIcon icon={faSun} />
      </div>

      <List list={list} setList={setList} />

      <footer>
        <p>
          <a href="https://github.com/DinaMuktubayeva/todo-list" target="_blank" rel="noreferrer">
            Source code
          </a>
        </p>
        <p>Author: Dina Muktubayeva (<a href="mailto:dina.muktubayeva@gmail.com">mail</a>)</p>
        <p>2021</p>
      </footer>
    </div>
  );
}

export default App;
