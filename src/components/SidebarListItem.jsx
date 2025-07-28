import React from 'react'

const SidebarListItem = ({loadFx, Image, Name, index}) => {
  
  return (
    <>
    <div onClick={loadFx} className='flex flex-row items-center w-full hover:bg-[#121212]' key={index}>
        <img className='w-[60px] p-3 rounded' src={Image} alt="" />
        <h6 dangerouslySetInnerHTML={{ __html: Name }}></h6>
    </div>
                            
    </>
  )
}

export default SidebarListItem