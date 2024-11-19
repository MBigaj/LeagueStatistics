import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from './components/MainPage';
import ChampionPage from './components/championPage/ChampionPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import StatisticsPage from './components/statisticsPage/StatisticsPage';
import Pages from './Pages'
import URLS from './urls';

function App() {
  const [champions, setChampions] = useState(null)
  const [championSearchString, setChampionSearchString] = useState('')

  const [currentPage, setCurrentPage] = useState(Pages.PAGE_CHAMPIONS)

  useEffect(() => {
    axios.get(`${URLS.BACKEND_URL}champions/get/`, {
      headers: {
      'Content-Type': 'application/json',
      },
    }).then(response => {
      setChampions(response.data)
    })
  }, [])

  return (
    <BrowserRouter>
      <NavBar championSearchString={championSearchString} setChampionSearchString={setChampionSearchString} currentPage={currentPage} />
      <Routes>
        <Route path="/" element={<Navigate to="/champions" />} />
        <Route path="/champions" element={ <MainPage champions={ champions } championSearchString={championSearchString} setCurrentPage={setCurrentPage} /> } />
        <Route path="/champion/:championId" element={ <ChampionPage setCurrentPage={setCurrentPage} /> } />
        <Route path="/statistics" element={ <StatisticsPage champions={champions} setCurrentPage={setCurrentPage} /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
