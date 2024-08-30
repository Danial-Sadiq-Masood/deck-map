"use client"

import React from 'react'
import LocationAggregatorMap from '../components/Map'
import CardDemo from '../shadComponents/sidebar'

const HomePage = () => {
  return (
    <div className='flex'>
      <div className="relative min-h-screen w-[85vw] rounded-xl overflow-hidden">
        <LocationAggregatorMap extensionKey='Final Votes' />
      </div>
      <div className='p-5 flex items-center'>
        <CardDemo />
      </div>
    </div>
  )
}

export default HomePage