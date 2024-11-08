import { useEffect, useState } from "react"
import { IoMdCheckmark } from "react-icons/io"
import { MdOutlineCancel } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import './ChampionTile.css'
import axios from "axios";
import NewGameModal from "./modals/NewGameModal";
import { useNavigate } from "react-router-dom";
import CompletedCharacterModal from "./modals/CompletedCharacterModal";

const ChampionTile = ({ champion }) => {
    const navigate = useNavigate()

    const [tileStyling, setTileStyling] = useState('')
    const [championAlreadyPlayed, setChampionAlreadyPlayed] = useState(champion.already_played)

    function swapStyling() {
        handleAlreadyPlayed(!championAlreadyPlayed)
        setChampionAlreadyPlayed(!championAlreadyPlayed)
    }

    useEffect(() => {
        if (championAlreadyPlayed) {
            setTileStyling('champion-tile-played')
        } else {
            setTileStyling('')
        }
    }, [championAlreadyPlayed])

    function handleAlreadyPlayed(alreadyPlayed) {
        axios.post(
            'http://localhost:3001/champions/update-already-played/',
            { 
                id: champion.id,
                alreadyPlayed: alreadyPlayed
            },
            {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' }
            }
        ).then(response => {
            return response.status
        })
    }

    function navigateToChampionPage() {
        navigate(`/champion/${champion.id}`)
    }

    function generateButton() {
        if (!championAlreadyPlayed) {
            return (
                <div className='d-flex justify-content-between'>
                    <NewGameModal buttonText={ <FaPlus /> } buttonStyling={'m-2 new-game-button game-button w-75'} champion={ champion } />
                    <CompletedCharacterModal
                        buttonText={ <IoMdCheckmark /> }
                        buttonStyling={'m-2 new-game-button game-button w-75'}
                        champion={ champion }
                        onClickCallback={ swapStyling }
                    />
                </div>
            )
        }

        return (
            <div className='d-flex justify-content-between'>
                <button className='m-2 new-game-button already-played w-100' onClick={ swapStyling }>
                    <MdOutlineCancel />
                </button>
            </div>
        )
    }

    return (
        <div className={ `shadow-border ${tileStyling}` }>
            <div className="fs-1 header-text">{ champion.name } </div>
            <img src={ champion.image_url } className='image-container' alt='oops' onClick={ navigateToChampionPage } />
            { generateButton() }
        </div>
    )
}

export default ChampionTile