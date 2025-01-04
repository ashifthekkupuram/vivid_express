import React from 'react'

const Spinner = () => {
  return (
    <div class="flex justify-center items-center h-screen">
      <div class="relative inline-flex">
        <div class="w-8 h-8 bg-[#2196F3] rounded-full"></div>
        <div class="w-8 h-8 bg-[#2196F3] rounded-full absolute top-0 left-0 animate-ping"></div>
        <div class="w-8 h-8 bg-[#2196F3] rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>
  )
}

export default Spinner
