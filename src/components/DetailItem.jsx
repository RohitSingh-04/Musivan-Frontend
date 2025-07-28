import React from 'react'

const DetailItem = ({label, value}) => {
  return (
    <div className="flex justify-between border-b border-gray-700 rounded-md p-2 hover:bg-[#121212]">
        <span className="font-medium text-gray-400">{label}</span>
        <span className="font-semibold">{value}</span>
  </div>
  )
}

export default DetailItem