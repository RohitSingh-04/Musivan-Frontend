import React, { useEffect, useRef, useState } from 'react'

const TimerComponent = ({ label, max, onDataSend, startsFrom }) => {
    // div reference 
    const scrollRef = useRef(null);

    // middle number data
    const [middleNumber, setMiddleNumber] = useState(null);
    // create list for the scroll div
    const numbersData = []
    for (let num = 0; num <= max; num++) {
        numbersData.push(num);
    }

    const getMiddleSpan = () => {
        // div containing spans
        const container = scrollRef.current;

        // if no container then return 
        if (!container) return;

        // calculation of middle of the div
        const containerTop = container.getBoundingClientRect().top;
        const containerHeight = container.clientHeight;
        const ContainerMiddle = containerTop + containerHeight / 2;

        // selecting the spans from container
        const spans = Array.from(container.querySelectorAll('span'));
        let closest = null;
        let closestDistance = Infinity;

        spans.forEach((span) => {
            const rect = span.getBoundingClientRect()
            const spanMiddle = rect.top + rect.height / 2;
            const distance = Math.abs(spanMiddle - ContainerMiddle);

            if (distance < closestDistance) {
                closestDistance = distance;
                closest = span;
            }
        });
        if (closest) {
            const value = parseInt(closest.textContent, 10);
            setMiddleNumber(value);
            return closest;
        }
    }

    
    const scrollToSpan = (targetNumber) => {
  const container = scrollRef.current;
  const targetSpan = document.getElementById(`span-${targetNumber}`);

  if (container && targetSpan) {
    const containerTop = container.getBoundingClientRect().top;
    const targetTop = targetSpan.getBoundingClientRect().top;

    const offset = targetTop - containerTop;
    const scrollTopValue = container.scrollTop + offset - container.clientHeight / 2 + targetSpan.clientHeight / 2;

    container.scrollTo({
      top: scrollTopValue,
      behavior: 'smooth',
    });
  }
};


    useEffect(() => {
        const handleScroll = () => {
            getMiddleSpan();
        }
        const container = scrollRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);

            getMiddleSpan();
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [])
    
  useEffect(() => {
    if (startsFrom) {
      scrollToSpan(startsFrom / 60000);
    }
  }, [startsFrom]);
    function pretifyNumber(num){
        if (num<10){
            return "0"+num;
        }
        else{
            return `${num}`
        }
    }

    return (
        <>
            <span className='text-white text-[20px]'>{label}</span> 
            <div className='h-20 flex flex-col flex-grow overflow-y-auto bg-[#232323] rounded-2xl px-7' ref={scrollRef}>
                {numbersData.map((number, index) => (
                    <span className={`${(number === middleNumber)?"text-white text-[22px] ":"text-zinc-500 text-[20px] "}`}  id={`span-${number}`} key={index}>{pretifyNumber(number)}</span>
                ))}
                <span className={`text-zinc-500 text-[20px]`} >00</span>
            </div>
            <button className='bg-white text-black text-[15px] rounded-2xl w-[50px] mt-5 cursor-pointer' onClick={()=>{onDataSend(middleNumber)}}>Done</button>
        </>
    )
}

export default TimerComponent