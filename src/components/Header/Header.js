import React from 'react';
import Timer from './Timer';

const Header = () => {
  return (
    <header style={{backgroundImage: 'linear-gradient(to top, #5390d9, #4f85d9, #507ad7, #556dd3, #5e60ce)'}}>
      <nav class="navbar d-flex justify-content-between ms-5">
        <div className="d-flex">
          <p class="h1 fw-bolder">Schedule</p>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="4vh">
            <path fill="#b5179e" d="M53.9,-62.7C67.8,-52.6,75.6,-33.7,73.8,-17C72,-0.3,60.7,14.1,49.5,24C38.4,33.9,27.3,39.3,14.1,48.3C0.8,57.3,-14.6,69.9,-25.8,67.3C-37,64.8,-44,47.1,-50.4,31.3C-56.8,15.6,-62.7,1.7,-63.4,-14.2C-64.2,-30.1,-59.9,-48.2,-48.5,-58.7C-37.1,-69.2,-18.5,-72.2,0.7,-73.1C20,-73.9,40,-72.8,53.9,-62.7Z" transform="translate(100 100)" />
          </svg>
        </div>
        <Timer />
      </nav>
    </header>
  );
}
 
export default Header;