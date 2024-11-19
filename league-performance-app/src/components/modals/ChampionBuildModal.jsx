import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import './ChampionBuildModal.css'

function ChampionBuildModal({ buttonText, buttonStyling, builds }) {
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (builds) {
        setIsLoading(false)
    }
  }, [builds])

  const renderContent = () => {
    if (isLoading) {
        return (
            <div className='d-flex justify-content-center '>
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        builds.map(build => {
            return ( <div>
                <div className='d-flex'>
                    { build.map(item => {
                        console.log(build)
                        return (
                            <img className='item-image mx-2' src={ item.src } />
                        )
                    }) }
                </div>
                <hr></hr>
            </div> )
        })
    )
  }

  return (
    <div className='d-flex justify-content-center'>
      <button className={ buttonStyling } onClick={handleShow}>
        { buttonText }
      </button>

      <Modal className='champion-build-modal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Available builds for the champion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            { renderContent() }
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ChampionBuildModal