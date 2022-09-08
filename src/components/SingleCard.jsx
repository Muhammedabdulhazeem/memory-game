import { useEffect, useState } from 'react'
import './SingleCard.css'

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
    const handleClick = () => {
        if (!flipped && !disabled) {
            handleChoice(card)

        }
    }

    // useEffect(() => {

    //     setClicked(false)
    //     if(flipped) setClicked(true)
    // }, [flipped])
    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img src={card.src} alt="card front" className="front" />
                <img 
                    src="/img/cover.png" 
                    alt="card back" 
                    className="back" 
                    onClick={ handleClick }
                />
            </div>
        </div>
    );
}
 
export default SingleCard;