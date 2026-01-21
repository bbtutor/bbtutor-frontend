// components/KeepAlive.tsx
"use client";

import { useEffect } from "react";
import axios from "axios";

let healthCheckInitiated = false;
let healthCheckInterval: NodeJS.Timeout | null = null;

export function KeepAlive() {
  useEffect(() => {
    if (healthCheckInitiated) return;

    healthCheckInitiated = true;

    const pingServer = async () => {
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_HEALTHURL}/health`);
        console.log("Server pinged successfully");
      } catch (error) {
        console.log("Health check failed:", error);
      }
    };

    // Initial ping
    pingServer();

    // Ping every 10 minutes to prevent sleep (15 min timeout on Render free tier)
    healthCheckInterval = setInterval(pingServer, 10 * 60 * 1000);

    return () => {
      if (healthCheckInterval) {
        clearInterval(healthCheckInterval);
        healthCheckInterval = null;
      }
    };
  }, []);

  return null; // This component renders nothing
}
