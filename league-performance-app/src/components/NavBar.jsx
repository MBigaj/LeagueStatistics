import { useNavigate } from 'react-router-dom'
import './NavBar.css'
import Pages from '../Pages'
import { FaArrowLeft } from "react-icons/fa";

const NavBar = ({ championSearchString, setChampionSearchString, currentPage }) => {
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    setChampionSearchString(e.target.value)
  }

  const navigateToPage = (page) => {
    navigate(`/${page}`)
  }

  const getNavbarButtons = () => {
    switch(currentPage) {
      case Pages.PAGE_CHAMPIONS:
        return (
          <div className='d-flex justify-content-center w-100 m-3'>
            <input type='text' className='form-control w-50 search-bar mx-2' value={championSearchString} onChange={handleOnChange} />
            <div className='statistics-button btn btn-light fs-5 btn mx-2' onClick={() => navigateToPage(Pages.PAGE_STATISTICS)}>Statistics</div>
          </div>
        )
      case Pages.PAGE_STATISTICS:
        return (
          <div className='d-flex justify-content-center w-100 m-3'>
            <div className='statistics-button btn btn-light fs-5 btn mx-2 w-25 d-flex justify-content-center align-items-center' onClick={() => navigateToPage(Pages.PAGE_CHAMPIONS)}>
              <FaArrowLeft className='mx-1' />
              <div className='mx-1'>Champions</div>
            </div>
          </div>
        )
      default:
        return (
          <div className='d-flex justify-content-center w-100 m-3'>
            <div className='statistics-button btn btn-light fs-5 btn mx-2 w-25 d-flex justify-content-center align-items-center' onClick={() => navigateToPage(Pages.PAGE_CHAMPIONS)}>
              <FaArrowLeft className='mx-1' />
              <div className='mx-1'>Champions</div>
            </div>
            <div className='statistics-button btn btn-light fs-5 btn mx-2' onClick={() => navigateToPage(Pages.PAGE_STATISTICS)}>Statistics</div>
          </div>
        )
    }
  }

  return (
    <div className='d-flex justify-content-center navbar-tile'>
      { getNavbarButtons() }
    </div>
  )
}

export default NavBar