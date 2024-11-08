import './GameTile.css'

const GameTile = ({ game }) => {
    const created_at = new Date(game.created_at).toLocaleString()

    return (
        <div className='row text-center justify-content-center align-items-center'>
            <div className={`col-md-1 game-box first my-2 d-flex justify-content-center align-items-center ${game.status === 'win' ? 'game-won' : 'game-lost'}`}>
                <div className='fw-bold'>{ game.status === 'win' ? 'WIN' : 'LOSS' }</div>
            </div>
            <div className={`col-md-1 game-box my-2 mx-1 d-flex justify-content-center align-items-center ${game.status === 'win' ? 'game-won-gradient' : 'game-lost-gradient'}`}>
                <div>
                    <div>Kills</div>
                    <div>{ game.kills }</div>
                </div>
            </div>
            <div className='col-md-1 game-box my-2 d-flex justify-content-center align-items-center'>
                <div>
                    <div>Deaths</div>
                    <div>{ game.deaths }</div>
                </div>
            </div>
            <div className='col-md-1 game-box my-2 mx-1 d-flex justify-content-center align-items-center'>
                <div>
                    <div>Assists</div>
                    <div>{ game.assists }</div>
                </div>
            </div>
            <div className='col-md-3 game-box last my-2 d-flex justify-content-center align-items-center'>
                { created_at }
            </div>
        </div>
    )
}

export default GameTile