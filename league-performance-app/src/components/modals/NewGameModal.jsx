import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './NewGameModal.css'
import axios from 'axios';
import URLS from '../../urls';

function NewGameModal({ buttonText, buttonStyling, champion }) {
  const [show, setShow] = useState(false);
  
  const [gameStatus, setGameStatus] = useState('win')
  const [gameKills, setGameKills] = useState('')
  const [gameDeaths, setGameDeaths] = useState('')
  const [gameAssists, setGameAssists] = useState('')

  const setterMap = {
    'status': setGameStatus,
    'kills': setGameKills,
    'deaths': setGameDeaths,
    'assists': setGameAssists,
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleAddNewGame() {
    const payload = {
        'championId': champion.id,
        'status': gameStatus,
        'kills': gameKills,
        'deaths': gameDeaths,
        'assists': gameAssists,
    }

    axios.post(
        `${URLS.BACKEND_URL}games/new/`,
        payload,
        {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        }
    )

    handleClose()
  }

  function handleOnChange(e) {
    setterMap[e.target.id](e.target.value)
  }

  return (
    <div>
      <button className={ buttonStyling } onClick={handleShow}>
        { buttonText }
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new game with { champion.name }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div className='d-flex row'>
                    <div>
                        <label htmlFor='status' className='mx-2'>Game Outcome</label>
                        <select className='col-md-6 form-select my-2' id='status' value={ gameStatus } onChange={ handleOnChange }>
                            <option value='win'>Victory</option>
                            <option value='los'>Defeat</option>
                        </select>
                    </div>
                </div>
                <div className='d-flex'>
                    <div className='mx-2'>
                        <label htmlFor="kills" className='mx-2'>Kills</label>
                        <input type='text' id='kills' className='form-control' value={ gameKills } onChange={ handleOnChange } />
                    </div>
                    
                    <div className='mx-2'>
                        <label htmlFor="deaths" className='mx-2'>Deaths</label>
                        <input type='text' id='deaths' className='form-control' value={ gameDeaths } onChange={ handleOnChange } />
                    </div>

                    <div className='mx-2'>
                        <label htmlFor="assists" className='mx-2'>Assists</label>
                        <input type='text' id='assists' className='form-control' value={ gameAssists } onChange={ handleOnChange } />
                    </div>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer className='modal-styling d-flex justify-content-between'>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddNewGame}>
            Add new Game
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NewGameModal;