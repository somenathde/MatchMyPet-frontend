import React from 'react'

const ShimmerUI = ({
  width = "w-full",
  height = "h-4",
  rounded = "rounded-md",
  className = "",
}) => {
  return (
     <div
      className={`animate-pulse bg-gray-200 ${width} ${height} ${rounded} ${className}`}>
        <h1>Loading....</h1>
    </div>
  )
}

export default ShimmerUI