"use client";

import React from "react";

export function BackgroundWatermark() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden select-none opacity-[0.03]">
      <div className="absolute top-[10%] left-[-5%] text-[20rem] font-black tracking-tighter rotate-[-15deg]">
        Zelmora
      </div>
      <div className="absolute top-[40%] right-[-10%] text-[15rem] font-black tracking-tighter rotate-[10deg]">
        Zenix
      </div>
      <div className="absolute bottom-[15%] left-[10%] text-[18rem] font-black tracking-tighter rotate-[-5deg]">
        Zelmora
      </div>
      <div className="absolute top-[70%] left-[50%] -translate-x-1/2 text-[12rem] font-black tracking-tighter opacity-50">
        Innovation
      </div>
    </div>
  );
}
