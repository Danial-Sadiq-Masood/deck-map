"use client"

import React, { useState } from 'react'
import LocationAggregatorMap from '@/components/seatsMap'
import CardDemo from '@/shadComponents/sidebar'

const HomePage = () => {
  const [keyVal, setKeyVal] = useState('na');
  const [flip,setFlip] = useState(false)

  const updateKeyVal = () => {
    if (keyVal == 'na') {
      setKeyVal('pa')
    } else {
      setKeyVal('na')
    }

    setFlip(!flip)
  }

  return (
    <div className='flex h-[100vh] p-[20px] gap-[20px]'>
      <div className="relative h-full pt-[20px] w-[85vw] rounded-xl overflow-hidden">
        <LocationAggregatorMap valKey={keyVal} flip={flip}/>
      </div>
      <div className='flex'>
        <CardDemo
          toggles={[[
            keyVal == 'na',
            updateKeyVal,
            'Show Average National Assembly Turnout'
          ],
          [
            keyVal == 'pa',
            updateKeyVal,
            'Show Average Provincial Assembly Turnout'
          ]]}
        />
      </div>
    </div>
  )
}

export default HomePage