import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Maquinas from "./components/Maquinas";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/maquinas" element={<Maquinas />} />
        {/* Si luego agregas Precios y Contacto, añádelos aquí */}
      </Routes>
    </BrowserRouter>
  );
}
