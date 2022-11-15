import React from "react";
import SingleCard from "./Singlecard"
import {useEffect, useState} from "react";

import  Ace      from "../../assets/images/Ace.png"
import  King     from "../../assets/images/KING.png"
import  Queen    from "../../assets/images/QUEEN.png"
import  Jack     from "../../assets/images/JACK.png"
import  Ten      from "../../assets/images/TEN.png"
import  Joker    from "../../assets/images/JOKER.png"

const cardImages=[
    {"source" : Ace, match : false},
    {"source" : King, match : false},
    {"source" : Queen, match : false},
    {"source" : Jack, match : false},
    {"source" : Ten, match : false},
    {"source" : Joker, match : false},
]



export default function Game(){

    const [cards,setCards]= useState([])
    const [turns,setTurns]= useState(0)
    const [choiceone,setchoiceone]= useState(null)
    const [choicetwo,setchoicetwo]= useState(null)
    const [disabled,setDisabled] = useState(false)
    const [played , setplayed] = useState(0)

    const shuffelCards=()=>{
        const shufeldcards = [...cardImages,...cardImages].sort(()=>Math.random() - 0.5)
            .map((card)=>({ ...card , id: Math.random()}))
        setchoiceone(null);
        setchoicetwo(null);
        setCards(shufeldcards)
        setTurns(0)
    }

    const handelCard = (card)=>{
        choiceone ? setchoicetwo(card) : setchoiceone(card);
    }

    useEffect(()=>{
        if (choicetwo && choiceone) {
            setDisabled(true)
            if(choiceone.source === choicetwo.source){
                setCards(prevCard =>
                    prevCard.map(card=> {
                        if (card.source === choicetwo.source) {
                            return {...card , match : true}
                        }else {
                            return card
                        }
                    }))
                setplayed(prevTurn => prevTurn + 1)
                console.log(played)
                gameEnd ()
                resetTurn()
            }else {
                setTimeout(()=>{
                    resetTurn()
                } ,1000)
            }
        }
    },[choiceone,choicetwo])

    const resetTurn=()=>{
        setchoiceone(null);
        setchoicetwo(null);
        setTurns(prevTurn => prevTurn + 1)
        setDisabled(false)

    }

    useEffect(()=>{
        shuffelCards()
    },[])

    const gameEnd = ()=>{
        if(played === 5){
            setplayed(0)
            setTimeout(()=> {
                shuffelCards()
                alert("you won congrats")

            }, 1000)
        }
    }

    return  <div className="G-flex-colum parent">

     <button onClick={shuffelCards}>New Game</button>
     <p>Turns : {turns}</p>

     <div className='container'>
         {cards.map(card=> (
             <SingleCard
                 key={card.id}
                 card = {card}
                 img = {card.source}
                 handelCard = {handelCard}
                 flipped = {card === choiceone || card === choicetwo || card.match}
                 disabled= {disabled}
             />
         ))}
     </div>
 </div>
}