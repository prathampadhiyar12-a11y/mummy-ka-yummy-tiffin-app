import React from "react";

export function TopMarquee() {
  return (
    <div className="flex overflow-hidden bg-[#8a3b18] text-white py-2">
      <div className="whitespace-nowrap animate-marquee flex gap-10 items-center font-medium text-sm px-4">
        <span>Aaj khane me kya hai? Check our weekly menu!</span>
        <span>✨</span>
        <span>Fresh homemade food delivered to your doorstep</span>
        <span>🍲</span>
        <span>Healthy & Hygienic Meals</span>
        <span>✨</span>
        <span>Aaj khane me kya hai? Check our weekly menu!</span>
        <span>✨</span>
        <span>Fresh homemade food delivered to your doorstep</span>
        <span>🍲</span>
        <span>Healthy & Hygienic Meals</span>
        <span>✨</span>
        {/* Repeat content for seamless loop */}
        <span>Aaj khane me kya hai? Check our weekly menu!</span>
        <span>✨</span>
        <span>Fresh homemade food delivered to your doorstep</span>
        <span>🍲</span>
        <span>Healthy & Hygienic Meals</span>
        <span>✨</span>
      </div>
    </div>
  );
}
