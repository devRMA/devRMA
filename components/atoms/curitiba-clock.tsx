"use client";

import { useEffect, useState } from "react";

export function CuritibaClock() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const formattedTime = new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      setCurrentTime(formattedTime);
    };

    updateTime();
    const timerIdentifier = setInterval(updateTime, 1000);
    return () => clearInterval(timerIdentifier);
  }, []);

  return (
    <p className="font-mono text-xs text-emerald-500" suppressHydrationWarning>
      {currentTime ? `${currentTime} (UTC-3)` : "UTC-3"}
    </p>
  );
}
