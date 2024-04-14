import React from 'react'

const Card = ({ image, selected, onClick }) => {
  return (
    <div className='card'>
      <dvi className={selected && 'selected'}>
        <img alt="" src={image} className='card-face'/>
        <img alt="" src={'/assets/fireship.png'} className='card-back'/>
      </dvi>
    </div>
  )
}

export default Card