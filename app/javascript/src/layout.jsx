import React, { useEffect, useState } from 'react';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAirbnb } from '@fortawesome/free-brands-svg-icons';

import { handleErrors } from '@utils/fetchHelper';
import UserIcon from './userIcon';

import './home.scss'

const Layout = (props) => {
  const [username, setUsername] = useState('')

  useEffect(() => {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        setUsername(data.username)
      })
  }, []);

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light">
        <div className="container-fluid">
          <a className='navbar-brand ms-5 d-none d-sm-inline' href='/'>
            <FontAwesomeIcon 
              className='brand'
              icon={ faAirbnb }
            />
            <span className='xl-brand d-none d-xl-inline'>airbnb</span>
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active me-2" href={`/new-property`}>AirBnB Your Home!</a>
              </li>
              <li className='nav-item dropdown'>
                <UserIcon username={ username }/>
                <ul 
                  className="dropdown-menu" 
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    { username
                      ? <>
                          <a className="dropdown-item" href={`/user/${username}`}>Bookings</a>
                          <a className="dropdown-item" href="/my-properties">My Properties</a>
                        </>
                      : <a className="dropdown-item" href={`/login?redirect_url=${window.location.pathname}`}>Sign In/Log In</a>
                    }
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {props.children}
      <footer className="p-3 bg-light">
        <div>
          <p className="me-3 mb-0 text-secondary">Airbnb Clone</p>
        </div>
      </footer>
    </React.Fragment>
  )

};

export default Layout;