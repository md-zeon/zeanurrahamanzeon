"use client";

import { useEffect, useState } from "react";

/**
 * Live 24-hour clock (HH:MM) used in the navbar.
 *
 * Renders a plain div so the label is purely presentational; time updates
 * every second via a self-cleaning interval.
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
    const id = setInterval(format, 1000);
    return () => clearInterval(id);
  }, []);

  return <div className={className}>{time}</div>;
}
