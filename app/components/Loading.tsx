import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="relative w-[200px] h-[200px]">
        {/* Rocket in the center with bounce animation */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="text-4xl animate-bounce">🚀</div>
        </div>

        {/* Orbiting emojis */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-[200px] h-[200px] relative animate-spin-slow">
            {/* Each emoji is positioned in a circular orbit */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-5xl">
              🌕
            </div>
            <div className="absolute top-[15%] right-0 text-5xl">🪐</div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-5xl">
              🌍
            </div>
            <div className="absolute top-[15%] left-0 text-5xl">🌟</div>
          </div>
        </div>
      </div>

      <p className="text-white text-xl font-semibold mt-8">
        Preparing for liftoff...
      </p>
    </div>
  );
};

export default Loading;
