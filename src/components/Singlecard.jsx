import React from "react";
import image from "../assets/cardback.png";

const SingleCard = ({card  ,handelCard ,flipped,disabled,img})=>{
    const handeClick = ()=>{
        if(!disabled) {
            handelCard(card)
        }
    }
    return (
  <div className='card'>
      <div className={flipped ? "flipped" : ""}>
          <img className='front' src={card.source} alt="card-front" />
          <div className='back' style={{backgroundImage : `url(${image})`}}onClick={handeClick}></div>

      </div>
  </div>
    )
}

export default SingleCard;