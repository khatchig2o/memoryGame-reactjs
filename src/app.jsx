import React, {useEffect, useState} from "react";
import SingleCard from "./components/Singlecard"

const cardImages=[
    {"source" : "/images/Ace.png", match : false},
    {"source" : "/images/JACK.png", match : false},
    {"source" : "/images/JOKER.png", match : false},
    {"source" : "/images/KING.png", match : false},
    {"source" : "/images/QUEEN.png", match : false},
    {"source" : "/images/TEN.png", match : false},
]

const App =()=>{

    const [cards,setCards]= useState([])
    const [turns,setTurns]= useState(0)
    const [choiceone,setchoiceone]= useState(null)
    const [choicetwo,setchoicetwo]= useState(null)
    const [disabled,setDisabled] = useState(false)

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

    return(
        <div className="G-flex-colum parent">

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
    )
}
export default App;