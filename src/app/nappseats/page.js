"use client"

import React, { useState } from 'react'
import LocationAggregatorMap from '../../components/MapOverlap'
import CardDemo from '../../shadComponents/sidebarppna'

const HomePage = () => {
  const [showNA, setShowNA] = useState(true);
  const [showPP, setShowPP] = useState(true);

  return (
    <div className='flex h-[100vh] p-[20px] gap-[20px]'>
      <div className="relative h-full pt-[20px] w-[85vw] rounded-xl overflow-hidden">
        <LocationAggregatorMap extensionKey='Final Votes' {...{showNA,showPP}}/>
      </div>
      <div className='flex'>
        <CardDemo 
          toggles={[
            [showNA, setShowNA, 'Show NA Seats'],
            [showPP, setShowPP, 'Show PP Seats']
          ]}
        />
      </div>
    </div>
  )
}

export default HomePage