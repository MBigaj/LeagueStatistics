import './MainPage.css'
import ChampionTile from './ChampionTile'
import { useEffect, useState } from 'react'
import Pages from '../Pages'

const MainPage = ({ champions, championSearchString, setCurrentPage }) => {
    setCurrentPage(Pages.PAGE_CHAMPIONS)

    const [displayChampions, setDisplayChampions] = useState(null)

    useEffect(() => {
        setDisplayChampions(champions)
    }, [champions])

    useEffect(() => {
        console.log(championSearchString)
        if (championSearchString) {
            const filteredChampions = champions.filter(champion => champion.name.toLowerCase().includes(championSearchString))
            setDisplayChampions(filteredChampions)
        } else {
            setDisplayChampions(champions)
        }
    }, [championSearchString])

    return (
        <div className="container-fluid px-5">
            <div className='d-flex flex-wrap img-fluid mx-auto my-auto w-75'>
                { displayChampions && displayChampions.map(champion => {
                return (
                    <div className='champion-container m-4 text-center' key={ champion.id }>
                        <ChampionTile champion={ champion }/>
                    </div>
                )
                }) }
            </div>
        </div>
    )
}

export default MainPage