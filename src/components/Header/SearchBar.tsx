// src/components/Header/SearchBar.tsx
import React from "react";
import { Search } from "lucide-react";

interface Props {
  query: string;
  setQuery: (value: string) => void;
  fullWidth?: boolean;
}

export default function SearchBar({ query, setQuery, fullWidth }: Props) {
  return (
    <div
      className={`flex items-center bg-slate-100 rounded-full px-3 py-1.5 gap-2 ${
        fullWidth ? "w-full" : "w-48"
      }`}
    >
      <Search size={16} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar..."
        className="bg-transparent outline-none text-sm w-full"
      />
    </div>
  );
}
