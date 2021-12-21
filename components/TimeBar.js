import { useState, useEffect } from 'react';

const TimeBar = ({ percent, width, duration }) => {
    const [value, setValue] = useState(0);
    console.log(duration);

    useEffect(() => {
        setValue((percent / duration) * width);
    })

    return (
        <div className='bg-gray-700 rounded-sm' style={{width: `${width}px`}}>
            <div style={{width: `${value}px`}} className='bg-blue-500 h-2 rounded-sm'></div>
        </div>
    );
}

export default TimeBar
