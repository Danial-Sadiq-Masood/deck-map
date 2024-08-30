import React from 'react'
import LocationAggregatorMap from '../components/Map'

const HomePage = () => {
  return (
    <div className="relative min-h-screen">
      <LocationAggregatorMap extensionKey='Final Votes'/>
    </div>
  )
}

export default HomePage