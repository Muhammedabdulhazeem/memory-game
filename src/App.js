import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  // {"src": "/img/helmet-1.png",matched: false},
  // {"src": "/img/potion-1.png",matched: false},
  // {"src": "/img/ring-1.png",matched: false},
  // {"src": "/img/scroll-1.png",matched: false},
  // {"src": "/img/shield-1.png",matched: false},
  // {"src": "/img/sword-1.png",matched: false}
  {"src": "/img/helmet-1.png",matched: false},
  {"src": "/img/potion-1.png",matched: false},
  {"src": "/img/ring-1.png",matched: false},
  {"src": "/img/scroll-1.png",matched: false},
  {"src": "/img/shield-1.png",matched: false},
  {"src": "/img/sword-1.png",matched: false},
  
]


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [allMatched, setAllMatched] = useState(false)

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    
  }

  // check if all cards are matched
  const ifAll = cards.filter((card) => card.matched !== true)

  useEffect(() => {
    if(ifAll.length === 0) {
      setAllMatched(true)
    }
  }, [ifAll])

  // compare 2 selected cards
  useEffect(() => {

    if(choiceOne && choiceTwo) {
      setDisabled(true)

      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurns()
      } else {
        setTimeout(() => resetTurns(), 1000) 
      }
    }
  }, [choiceOne, choiceTwo])

  // console.log(cards)

 
  // reset choice & increase turn
  const resetTurns = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
    setAllMatched(false)
  }
  

  // shuffle cards
  const shuffleCard = () => {
    const sCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({...card, id: Math.random()}))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(sCards)
      setTurns(0)
      setAllMatched(false)
  }

  // start a game automatically
  useEffect(() => {
    shuffleCard()
  }, [])


  return (
    <div className="App">
      <h1>TEST YOUR MEMORY</h1>
      {allMatched && <p>Congratulations, you won 🎉🎉🎉</p>}
      <button onClick={shuffleCard}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            card={ card } 
            key={ card.id }
            handleChoice={handleChoice}
            flipped={ card === choiceOne || card === choiceTwo || card.matched}
            disabled = {disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>

    </div>
  );
}

export default App;
