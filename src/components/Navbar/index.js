import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

const Navbar = (props) => {

    const [search, setSearch] = useState(false);


    const submitSearch = (e) => {
        e.preventDefault();
        

    }


    const openSearch = () => {
        setSearch(true);
    }


    const searchClass = search ? 'searchInput active' : 'searchInput';

  return(
    <div className="navbar">
        <ul className="navbarMenu">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/Add Post">Add new post</NavLink></li>
            <li><NavLink to="/post">Recent</NavLink></li>
        
        </ul>
        <div className="search">
            <form onSubmit={submitSearch}>
                <input type="text" className={searchClass} placeholder="Search" />
                <img onClick={openSearch} className="searchIcon" src={require('../../assets/icons/search.png')} alt="Search" />
            </form>
            
        </div>
    </div>
   )

 }

export default Navbar