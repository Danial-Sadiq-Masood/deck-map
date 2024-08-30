"use client"

import React from 'react'
import LocationAggregatorMap from '../components/Map'
import CardDemo from '../shadComponents/sidebar'

const HomePage = () => {
  return (
    <div className='flex h-[100vh] p-[20px] gap-[20px]'>
      <div className="relative h-full pt-[20px] w-[85vw] rounded-xl overflow-hidden">
        <LocationAggregatorMap extensionKey='Final Votes' />
      </div>
      <div className='flex'>
        <CardDemo />
      </div>
    </div>
  )
}

export default HomePage