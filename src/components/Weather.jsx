import React from 'react';
import './Weather.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Weather() {
  return (
    <div className='weather'>
      <div className="serch-bar">
        <input type="text" placeholder='search' />
       
        <FontAwesomeIcon icon={faMagnifyingGlass} className='img' />
      </div>
    </div>
  );
}

export default Weather;
