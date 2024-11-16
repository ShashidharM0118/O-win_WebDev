// import React from 'react'
import Card from '../Card/Card.jsx'
import Card1Image from "../../assets/Card1Image.jpg"
import Card2Image from "../../assets/Card2Image.jpg"
import Card3Image from "../../assets/Card3Image.jpg"
import Card4Image from "../../assets/Card4Image.jpg"

function HotelCards() {
  return (
    <>
        <div className='flex space-x-10 p-10'>
            <Card localImageAddress={Card1Image}/>
            <Card localImageAddress={Card2Image}/>
            <Card localImageAddress={Card3Image}/>
            <Card localImageAddress={Card4Image}/>
        </div>
    </>
  )
}

export default HotelCards