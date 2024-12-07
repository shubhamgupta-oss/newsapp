import React, { useState, useContext } from 'react';
import { MyContext } from '../../context/mycontext'; 
import './NavBar.css';

const NavBar = () => {
  const [search, setSearch] = useState("");
  const { fetchData } = useContext(MyContext); 
  const [clicked, setClicked] = useState(false);

  const handleSearchOnChange = (e) => {
    setSearch(e.target.value); 
  };

  const handleSearchOnClick = () => {
    if (search.trim()) {
      fetchData(search); 
      setSearch(""); 
    }
  };

  const handelNavClick = (topic) => {
    setClicked(true);
    fetchData(topic);
  };

  return (
    <div className="mani-nav">
      <div className="leftnav">
        <h1 
          className={`${clicked ? 'topicSelected' : ''}`} 
          onClick={() => handelNavClick("LatestNews")}
        >
          Latest News
        </h1>
        <ul onClick={() => handelNavClick("Today News")}>Today News</ul>
        <ul onClick={() => handelNavClick("Today Hits")}>Today Hits</ul>
      </div>
      <div className="rightnav">
        <div className="search-box">
          <input
            value={search}
            onChange={handleSearchOnChange}
            type="text"
            placeholder="Enter your topic"
          />
          <button onClick={handleSearchOnClick}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
