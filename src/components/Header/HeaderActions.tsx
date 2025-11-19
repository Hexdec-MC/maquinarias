// src/components/Header/HeaderActions.tsx
import React from "react";
import { User, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeaderActions() {
  return (
    <>
      <Link
        to="/carrito"
        className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition"
      >
        <ShoppingCart size={18} />
        <span className="text-sm">Carrito</span>
      </Link>

      <Link
        to="/perfil"
        className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition"
      >
        <User size={18} />
        <span className="text-sm">Mi cuenta</span>
      </Link>
    </>
  );
}
