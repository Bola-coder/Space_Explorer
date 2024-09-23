// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "./components/Loading";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/launches");
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black text-white text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Space Explorers!</h1>
      <p className="text-lg mb-6">
        Explore the latest rocket launches around the world.
      </p>
      <button
        className="px-6 py-2 text-lg font-semibold text-white bg-orange-500 rounded hover:bg-orange-400 transition"
        onClick={handleRedirect}
      >
        Launch Now 🚀
      </button>
    </div>
  );
}
