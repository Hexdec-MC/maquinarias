import React from "react";

export default function Logo() {
  return (
    <a href="/" className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
        A
      </div>
      <div className="hidden sm:block">
        <h1 className="text-lg font-semibold">AppStore</h1>
        <p className="text-xs text-slate-500 -mt-0.5">Panel</p>
      </div>
    </a>
  );
}
