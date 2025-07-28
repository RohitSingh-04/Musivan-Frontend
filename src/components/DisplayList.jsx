import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { PlayerContext } from '../context/PlayerContext';
import { BackendContext } from '../context/BackendContext';

const DisplayList = ({loadFx, index, Image, Name, Album, UserId, deleteFx, DeleteBtn = false}) => {

    const [Username, setUsername] = useState("rohiyaaa");
    
      const {axiosInstance} = useContext(AuthContext);
      const {BACKEND_URL} = useContext(BackendContext);

    if (UserId){

      useEffect(()=>{
        
        const fetchUsername = async (id) => {
          
          try {
            const response = await axiosInstance.get(
              `${BACKEND_URL}/api/get-username/${id}`
            );
            console.log(response.data)
            setUsername(response.data.username);
            
          } catch (error) {
            console.error("Error fetching playlist: your are not auth to access this item", error);
          }
          
        };
        fetchUsername(UserId)
        
      }, [UserId]);
    }
    const handleDeleteClick = (e) => {
        e.stopPropagation(); // Prevent the onClick on the parent div from firing
        if (deleteFx) {
            deleteFx();
        }
    };

    return (
        <div
            onClick={() => { loadFx(); }}
            className='group grid grid-cols-3 sm:grid-cols-3 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer relative' // Added 'group' and 'relative'
        >
            <p className='text-white flex flex-row'>
                <b className='mr-4 text-[#a7a7a7] hidden md:block'>{index + 1}</b>
                <img src={Image} className="inline w-10 mr-5" alt="" />
            </p>

            <div>
                <div className='text-white truncate sm:w-64 md:w-96'>
                    <span dangerouslySetInnerHTML={{ __html: Name }} className=''></span>
                </div>
                {
                    (UserId) ?
                        <p className='text-[15px]' dangerouslySetInnerHTML={{ __html: Username }}></p>
                        : (Album) ?
                            <div className='truncate sm:w-64 md:w-96'>
                                <p className='text-[10px] md:text-[15px]' dangerouslySetInnerHTML={{ __html: Album }}></p>
                            </div>
                            : ""
                }
            </div>
            <p className='text-[15px] hidden sm:block'>5 days ago</p>
              {
                (DeleteBtn)
                ?
            <button onClick={handleDeleteClick} className='absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                Delete
            </button>
                :
                ""
              }
        </div>
    );
}

export default DisplayList