import React from 'react';
import './style.css';


const Header = (props) => {
  return(
    <header className="header">
        <nav className="headerMenu">
            <a href="./">Home</a>
            <a href="./home">Logout</a>
            <a href="#">Contact Me</a>
        </nav>
        <div>
            socila Media links
        </div>
    </header>
   )

 }

export default Header