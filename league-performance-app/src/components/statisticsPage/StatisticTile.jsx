import { useNavigate } from 'react-router-dom'
import './StatisticTile.css'

const StatisticTile = ({ filteredChampion, filterName }) => {
  const navigate = useNavigate()

  const onClickChampionImage = () => {
    navigate(`/champion/${filteredChampion.id}`)
  }

  return (
    <div className='row text-center justify-content-center align-items-center'>
      <div className='col-md-2 statistic-game-box statistic-champion-image-container first my-2 d-flex justify-content-center align-items-center' onClick={onClickChampionImage}>
        <img src={ filteredChampion.image_url } alt='Whoops' />
      </div>
      <div className='col-md-2 statistic-game-box my-2 ms-1 d-flex justify-content-center align-items-center'>
        <div>{ filteredChampion.name }</div>
      </div>
      <div className='col-md-2 statistic-game-box last my-2 mx-1 d-flex justify-content-center align-items-center'>
        <div>
          <div>{ filterName }</div>
          <div>{ filterName === 'K/DA' ? parseFloat(filteredChampion.statistic).toFixed(2) : filteredChampion.statistic }</div>
        </div>
      </div>
    </div>
  )
}

export default StatisticTile