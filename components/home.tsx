"use client";
import { useEffect, useState } from "react";

import { createUrl } from "@/app/actions";

export default function Home() {
  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/hello");
      const { version } = await res.json();
      setMessage(version);
    };
    fetchData();
  }, []);

  if (!message)
    return (
      <div className="container mx-auto h-screen flex flex-col items-center justify-center">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );

  return (
    <p>
      <div className="container mx-auto h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">
          Welcome to Wannabe URL Shortener v{message}
        </h1>
      </div>
    </p>
  );
}
