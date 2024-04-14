import React from 'react';
import './App.css';
import { useState } from 'react';
import shuffle from './utilities/shuffel';
import Card from './components/Card';

function App() {
  const [cards, setCards] = useState(shuffle);

  return (
    <>
      <div className='grid'>
        {cards.map((card) => {
          const { Image, id, matched } = card;
          return (
            <Card
              key={id}
              image={Image}
              selected={false}
              onClick={() => {}}
            />
          )
        })}
      </div>
    </>
  );
}

export default App;
