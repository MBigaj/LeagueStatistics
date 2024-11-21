import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import GameTile from "./GameTile"
import './ChampionPage.css'
import Pages from "../../Pages"
import URLS from "../../urls"
import ChampionBuildModal from "../modals/ChampionBuildModal"

const ChampionPage = ({ setCurrentPage }) => {
    const navigate = useNavigate()

    setCurrentPage(Pages.PAGE_CHAMPION_STATS)

    const { championId } = useParams()

    const [champion, setChampion] = useState(null)
    const [games, setGames] = useState(null)
    const [builds, setBuilds] = useState(null)

    useEffect(() => {
        axios.get(`${URLS.BACKEND_URL}champions/get-one/${championId}`, {
            headers: {
                'Content-Type': 'application/json',
                },
            }).then(response => {
                setChampion(response.data[0])
            })

        axios.get(`${URLS.BACKEND_URL}games/get/${championId}`, {
            headers: {
                'Content-Type': 'application/json',
                },
            }).then(response => {
                setGames(response.data)
            })
    }, [])

    useEffect(() => {
        if (champion) {
            fetchBuildForChampion()
        }
    }, [champion])

    const fetchBuildForChampion = () => {
        const championName = champion.name.replace("'", '')

        if (!builds) {
            axios.get(`${URLS.FLASK_URL}champion/${championName}`, {
                headers: {
                    'Content-Type': 'application/json',
                    },
                }).then(response => {
                    setBuilds(response.data)
                })
        }
    }

    function handleBackToHome() {
        navigate(`/${Pages.PAGE_CHAMPIONS}`)
    }

    function getTotalOfStat(statName) {
        let count = 0

        switch(statName) {
            case 'kills':
                for (const game of games) {
                    count += game.kills
                }
                return count

            case 'deaths':
                for (const game of games) {
                    count += game.deaths
                }
                return count
                
            case 'assists':
                for (const game of games) {
                    count += game.assists
                }
                return count

            case 'kda':
                let kills = 0
                let deaths = 0

                for (const game of games) {
                    kills += game.kills + game.assists
                    deaths += game.deaths
                }
                if (kills && deaths) {
                    return (kills / deaths).toFixed(2)
                }
                return 0
        }
    }

    return (
        <div className="container">
            { champion && 
                <div className="d-flex justify-content-center row position-relative">
                    <div className="my-4 col-md-6 d-flex justify-content-start">
                        <img src={ champion.image_url } className="champion-image" onClick={ handleBackToHome } alt='hello' />
                        <div className="caption d-flex text-center justify-content-center w-auto">
                            <p className="image-text">{ champion.name }</p>
                        </div>
                    </div>
                    <div className="mt-3 col-md-2 text-center">
                        <div className="total-stats-box kills-box mt-1">
                            <div>Total Kills</div>
                            <div>{ games && getTotalOfStat('kills') }</div>
                        </div>
                        <div className="total-stats-box deaths-box my-1">
                            <div>Total Deaths</div>
                            <div>{ games && getTotalOfStat('deaths') }</div>
                        </div>
                        <div className="total-stats-box assists-box my-1">
                            <div>Total Assists</div>
                            <div>{ games && getTotalOfStat('assists') }</div>
                        </div>
                        <div className="total-stats-box kda-box mt-1">
                            <div>K/DA</div>
                            <div>{ games && getTotalOfStat('kda') }</div>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <ChampionBuildModal buttonText={ 'SHOW BUILDS' } buttonStyling={ 'btn btn-danger w-100' } builds={ builds } onClick={ fetchBuildForChampion } />
                    </div>
                </div> }
            <hr className="breakpoint"></hr>
            { games && games.map(game => {
                return (
                    <div key={ game.id }>
                        <GameTile game={ game } />
                    </div>
                )
            }) }
        </div>
    )
}

export default ChampionPage