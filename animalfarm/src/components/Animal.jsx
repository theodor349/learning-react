import React from 'react'

const Animal = ({type, name, age}) => {
  return (
    <li>
      <strong>{type}</strong> {name} ({age} years old)
    </li>
)}

export default Animal