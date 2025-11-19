// src/components/Header/NavLinks.tsx
import React from "react";
import { Link } from "react-router-dom";

export type NavLinkType = {
  label: string;
  href: string;
};

interface Props {
  links: NavLinkType[];
  onClick?: () => void;
  className?: string;
}

export default function NavLinks({ links, onClick, className }: Props) {
  return (
    <div className={className}>
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          onClick={onClick}
          className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-md transition"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
