"use client";

import { useEffect } from "react";

export default function PWAInstaller() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      fetch("/sw.js") // Ensure the file exists
        .then((response) => {
          if (!response.ok) throw new Error("Service Worker not found");
          return navigator.serviceWorker.register("/sw.js");
        })
        .then(() => console.log("Service Worker registered successfully"))
        .catch((err) =>
          console.error("Service Worker registration failed:", err)
        );
    }
  }, []);

  return null;
}
