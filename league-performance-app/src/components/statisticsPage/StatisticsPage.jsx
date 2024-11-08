import { useEffect, useState } from "react"
import Pages from "../../Pages"
import './StatisticsPage.css'
import axios from "axios"
import StatisticTile from "./StatisticTile"

const StatisticsPage = ({ setCurrentPage }) => {
  setCurrentPage(Pages.PAGE_STATISTICS)

  const [activeFilter, setActiveFilter] = useState(null)
  const [sortMethod, setSortMethod] = useState('desc')

  const [filteredChampions, setFilteredChampions] = useState(null)

  const [activeButton, setActiveButton] = useState(null)

  const buttonDefaultClass = 'btn btn-light'
  const buttonClickedClass = 'btn btn-light selected-filter-button'

  const filterMap = {
    'games-played': 'Games Played',
    'kills': 'Kills',
    'deaths': 'Deaths',
    'assists': 'Assists',
    'kda': 'K/DA',
    'fun_factor': 'Fun Factor',
  }

  const activateFilter = (e) => {
    setActiveFilter(e.target.value)

    if (activeButton) {
      activeButton.className = buttonDefaultClass
    }

    setActiveButton(e.target)
    e.target.className = buttonClickedClass
  }

  const onChangeSortingMethod = (e) => {
    setSortMethod(e.target.value)
  }

  useEffect(() => {
    if (activeFilter && sortMethod) {
      console.log(activeFilter)
      axios.get('http://localhost:3001/champions/get-statistics/', {
        params: {
          filter: activeFilter,
          order: sortMethod,
        },
        headers: {
            'Content-Type': 'application/json',
            },
        }).then(response => {
            setFilteredChampions(response.data)
            console.log(response.data)
        })
    }
  }, [activeFilter, sortMethod])

  return (
    <div>
      <div className='d-flex justify-content-center mt-4 pb-4'>
        <div className='statistics-selectors d-flex justify-content-between'>
          <button className='btn btn-light' value='games-played' onClick={activateFilter}>Number of games played</button>
          <button className='btn btn-light' value='kills' onClick={activateFilter}>Top kills</button>
          <button className='btn btn-light' value='deaths' onClick={activateFilter}>Top Deaths</button>
          <button className='btn btn-light' value='assists' onClick={activateFilter}>Top Assists</button>
          <button className='btn btn-light' value='kda' onClick={activateFilter}>Top K/DA</button>
          <button className='btn btn-light' value='fun_factor' onClick={activateFilter}>Fun Factor</button>
          <select className='form-select sort-field' onChange={onChangeSortingMethod}>
            <option value='desc'>Descending</option>
            <option value='asc'>Ascending</option>
          </select>
        </div>
      </div>
      <div className='d-flex flex-wrap img-fluid mx-auto my-auto w-75'>
        { filteredChampions && filteredChampions.map(filteredChampion => {
        return (
            <div key={ filteredChampion.id } className='container'>
              <StatisticTile filteredChampion={filteredChampion} filterName={filterMap[activeFilter]} />
            </div>
        )
        }) }
      </div>
    </div>
  )
}

export default StatisticsPage