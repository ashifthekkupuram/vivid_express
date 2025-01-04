import React from 'react'

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative inline-flex">
        <div className="w-8 h-8 bg-[#2196F3] rounded-full"></div>
        <div className="w-8 h-8 bg-[#2196F3] rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 bg-[#2196F3] rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>
  )
}

export default Spinner
