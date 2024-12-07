import React from 'react';
import './Card.css';

function Card({ val }) {
  if (!val.urlToImage) {
    return null; 
  }

  return (
    <div className="mainCard">
      <img className="ImgOnCard" src={val.urlToImage} alt="News Thumbnail" />
      <div className="imgContent">
        <span className="newsTitle">{val.title}</span>
        <span className="description">{val.description}</span>
        <button className="readmore">Read More</button>
      </div>
    </div>
  );
}

export default Card;
