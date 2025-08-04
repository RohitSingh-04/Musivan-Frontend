import React, { useContext, useState } from 'react'
import { PlayerContext } from '../context/PlayerContext';
import TimerComponent from './TimerComponent';

const SleepTimer = ({onClose}) => {
    const {pause, TimeoutInstance, setTimeoutInstance, TimerTime, setTimerTime} = useContext(PlayerContext);

    const setTimer = (time) => {

        time = time*60000;
        if (TimeoutInstance){
          clearTimeout(TimeoutInstance);
        }
        setTimeoutInstance(setTimeout(()=>{
          pause();
        }, time));
        setTimerTime(time);

        onClose();

    }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-[#1e1e1e] rounded-xl w-full max-w-md shadow-lg relative p-4">
            <button onClick={onClose} className="absolute top-1 right-3 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-red-500">
            ✕
            </button>

            <div className='flex flex-col items-center'>
              <TimerComponent label="Minutes" max="60" onDataSend={setTimer} startsFrom={TimerTime}/>
            </div>
            
        </div>
    </div>
  )
}

export default SleepTimer