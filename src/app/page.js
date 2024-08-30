"use client"

import React, { useState } from 'react'
import LocationAggregatorMap from '../components/Map'
import CardDemo from '../shadComponents/sidebar'

const HomePage = () => {
  const [showPTI, setShowPTI] = useState(false);
  const [showNonPTI, setShowNonPTI] = useState(false);

  return (
    <div className='flex h-[100vh] p-[20px] gap-[20px]'>
      <div className="relative h-full pt-[20px] w-[85vw] rounded-xl overflow-hidden">
        <LocationAggregatorMap extensionKey='Final Votes' {...{showPTI,showNonPTI}}/>
      </div>
      <div className='flex'>
        <CardDemo 
          toggles={[[showPTI, setShowPTI, 'PTI Polling Stations Turnout'], [showNonPTI, setShowNonPTI, 'Non-PTI Polling Stations Turnout']]}
        />
      </div>
    </div>
  )
}

export default HomePage