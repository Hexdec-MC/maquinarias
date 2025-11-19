// src/components/Header/Header.tsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

import NavLinks, { type NavLinkType } from "./Header/NavLinks";
import SearchBar from "./Header/SearchBar";
import HeaderActions from "./Header/HeaderActions";
import MobileMenu from "./Header/MobileMenu";

const NAV_LINKS: NavLinkType[] = [
  { label: "Inicio", href: "/dashboard" },
  { label: "Maquinas", href: "/maquinas" },
  { label: "Precios", href: "/precios" },
  { label: "Contacto", href: "/contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <header className="w-full bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLinks links={NAV_LINKS} />
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex">
              <SearchBar query={query} setQuery={setQuery} />
            </div>

            <HeaderActions />

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="p-2 rounded-md hover:bg-slate-100 md:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        open={open}
        query={query}
        setQuery={setQuery}
        links={NAV_LINKS}
        closeMenu={() => setOpen(false)}
      />
    </header>
  );
}
