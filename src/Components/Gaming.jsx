import React, { use, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Gaming = () => {

  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState([]);
  const [isSolved, setIsSolved] = useState([]);

  const [disable, setDisable] = useState(false);
  const [isWon, setIsWon] = useState(false);

  const [score, setScore] = useState(0);
  const [limitedFlip, setLimitedFlip] = useState(0);

  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const countPairs = Math.floor(totalCards / 2);
    const numbers = [...Array(countPairs).keys().map((value) => value + 1)];
    const shuffleCards = [...numbers, ...numbers]
      .slice(0, totalCards)
      .sort(() => Math.random() - 0.5)
      .map((number, index) => ({id : index , value : number}))

    setCards(shuffleCards);

    setIsFlipped([]);
    setIsSolved([]);
    setDisable(false);
    setIsWon(false);

    setScore(0);
    setLimitedFlip(totalCards + (Math.floor(totalCards / 4)));
  }

  useEffect(() => {
    initializeGame()
  }, [gridSize])

  // Change the Grid Size
  const handleOnChange = (value) => {
    if(value >= 2 && value <= 10) {
      setGridSize(value);
    }
  }

  const checkMatch = (secondCardId) => {

    if(limitedFlip === 0) {
      toast.info("You have reached your limit...");
      initializeGame();
  }
    
    const [firstCardId] = isFlipped;

    // To check both value are equal
    if(cards[firstCardId].value === cards[secondCardId].value) {
      setIsSolved([...isSolved, firstCardId, secondCardId]);
      setIsFlipped([]);
      setDisable(false);

      setScore((prev) => {
        const updateScore = prev + 1;
        return updateScore;
      })
    }

    else {
      setTimeout(() => {
        setIsFlipped([]);
        setDisable(false);
      }, 1000)
    }

    setLimitedFlip((prev) => {
      const updateFlip = prev - 1;
      return updateFlip;
    })
  }

  const handleOnClick = (id) => {

    if(disable || isWon) return;

    // Flip the first Card
    if(isFlipped.length === 0) {
      setIsFlipped([id]);
      return;
    }

    // Flip the second Card
    if(isFlipped.length === 1) {
      setDisable(true);
      if(id !== isFlipped[0]) {
        setIsFlipped([...isFlipped, id])
        checkMatch(id);
      }

      else {
        setIsFlipped([]);
        setDisable(false);
      }
    }

  }

  const myFlipped = (id) => {
    return isFlipped.includes(id) || isSolved.includes(id);
  }
  
  useEffect(() => {
    
    if(cards.length > 0 && cards.length === isSolved.length) {
      setIsWon(true);
    }
    
  }, [isSolved, cards])

  return (
    <div>
      <label htmlFor="">Grid Size : (Max 10)</label>
      <input type="number" min={2} max={10} value={gridSize} className='input-box' onChange={(e) => handleOnChange(e.target.value)} />

      {/* Reset or Try Again Game */}
      <button onClick={() => initializeGame()} className='reset-btn'>{isWon ? "Try Again" : "Reset Game"}</button>

      <section className='score-node'>

      {/* Your Score Section */}
      <div className='score-box'>Score : {score}</div>

      {/* Limited Flip Section */}
      <div className='limit-box'>Limit : {limitedFlip}</div>

      </section>

      <div className='container'>

      <div className="cards-container" style={{
        gridTemplateColumns : `repeat(${gridSize}, 1fr)`
      }}>
        {
          cards.map((card, index) => {
            return <div className='card-cell' onClick={() => handleOnClick(card.id)} style={myFlipped(card.id) ? {
              backgroundColor : "green",
              color : "white"
            } : {
              backgroundColor : "blue",
              color : "white"
            }} key={card.id}>{myFlipped(card.id) ? card.value : "?"}</div>
          })
        }
      </div>
    </div>

    {isWon && <div className='won-btn'>You Won</div>}
      
    </div>
  )
}

export default Gaming
