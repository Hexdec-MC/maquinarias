// src/components/Header/MobileMenu.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type NavLinkType } from "./NavLinks";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import { User, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  query: string;
  setQuery: (v: string) => void;
  links: NavLinkType[];
  closeMenu: () => void;
}

export default function MobileMenu({ open, query, setQuery, links, closeMenu }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="md:hidden border-t border-slate-100 bg-white"
        >
          <div className="px-4 py-4 space-y-3">
            <SearchBar query={query} setQuery={setQuery} fullWidth />
            <NavLinks links={links} onClick={closeMenu} className="grid gap-2" />

            <div className="flex items-center gap-3 pt-2">
              <Link
                to="/perfil"
                onClick={closeMenu}
                className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100"
              >
                <User size={18} />
                <span>Mi cuenta</span>
              </Link>

              <Link
                to="/carrito"
                onClick={closeMenu}
                className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100"
              >
                <ShoppingCart size={18} />
                <span>Carrito</span>
              </Link>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
