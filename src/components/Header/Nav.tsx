// src/components/Nav.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavLinks from "./NavLinks";
import { NavLink } from "./NavLinks";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  links: NavLink[];
  children?: React.ReactNode; // search, user icons, etc
};

export default function Nav({ open, setOpen, links, children }: Props) {
  return (
    <div className="flex items-center gap-6">
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        <NavLinks links={links} />
      </div>

      {/* Right-area children (search, icons, etc) */}
      <div className="flex items-center gap-3">{children}</div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden border-t border-slate-100 bg-white w-full"
          >
            <div className="px-4 py-4">
              <NavLinks links={links} onClick={() => setOpen(false)} className="grid gap-2" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
