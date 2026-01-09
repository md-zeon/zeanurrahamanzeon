"use client";

import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const DigitalClock = ({ className }: { className?: string }) => {
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
        const intervalId = setInterval(updateTime, 30000); // Update every 30 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={cn(className, "font-light")}>
            {time || new Date().toLocaleTimeString()}
        </div>
    );

}

export default DigitalClock;