"use client";

import { useEffect, useState } from "react";
import { getServiceStatus, type ServiceStatus } from "@/lib/schedule";

/**
 * Live/upcoming service status, ticking every second.
 * Returns null on the server & first paint so markup never mismatches.
 */
export function useServiceStatus(tickMs = 1000) {
  const [state, setState] = useState<{ status: ServiceStatus; now: number } | null>(null);

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      setState({ status: getServiceStatus(new Date(now)), now });
    };
    update();
    const id = window.setInterval(update, tickMs);
    return () => window.clearInterval(id);
  }, [tickMs]);

  return state;
}
