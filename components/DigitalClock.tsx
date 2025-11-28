"use client";

import { useState, useEffect } from 'react';

// 1:13 PM
const DigitalClock = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours() % 12 || 12;
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
            setTime(`${hours}:${minutes} ${ampm}`);
        };

        updateTime(); // Initial call
        const intervalId = setInterval(updateTime, 60000); // Update every minute

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    return (
        <div className="font-light">
            {time || new Date().toLocaleTimeString()}
        </div>
    );

}

export default DigitalClock;