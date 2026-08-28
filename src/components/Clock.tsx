"use client";

import { useEffect, useState } from "react";

/**
 * Live 24-hour clock (HH:MM) used in the navbar.
 *
 * Renders a plain div so the label is purely presentational; time updates on
 * the minute boundary (display shows HH:MM, so a 1-second interval would be
 * wasted work across the three clocks on the page).
 */
export default function Clock({ className }: { className?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    format();
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      const now = new Date();
      const msUntilNextMinute = (60 - now.getSeconds()) * 1000;
      timer = setTimeout(() => {
        format();
        schedule();
      }, msUntilNextMinute);
    };
    schedule();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return <div className={className}>{time}</div>;
}
