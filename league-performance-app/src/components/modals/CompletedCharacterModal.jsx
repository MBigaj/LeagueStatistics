import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './CompletedCharacterModal.css'
import axios from 'axios';

function CompletedCharacterModal({ buttonText, buttonStyling, champion, onClickCallback }) {
  const [show, setShow] = useState(false);

  const [funFactor, setFunFactor] = useState(0)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSetFunFactor() {
    const payload = {
        'id': champion.id,
        'funFactor': funFactor,
    }

    axios.post(
        'http://localhost:3001/champions/set-fun-factor/',
        payload,
        {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        }
    ).then(response => {
      onClickCallback()
    })

    handleClose()
  }

  function handleOnChange(e) {
    setFunFactor(e.target.value)
  }

  return (
    <div>
      <button className={ buttonStyling } onClick={handleShow}>
        { buttonText }
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>How much fun you had with { champion.name }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div className='d-flex row'>
                    <div>
                        <label htmlFor='funFactor' className='mx-2'>Set Fun Factor</label>
                        <input type='text' id='funFactor' className='form-control' value={ funFactor } onChange={ handleOnChange } />
                    </div>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer className='modal-styling d-flex justify-content-between'>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSetFunFactor}>
            Accept Rating
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CompletedCharacterModal;