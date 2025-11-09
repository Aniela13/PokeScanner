// src/app/page.tsx
"use client";

import AppContent from '../components/PokemonCardScanner'; // O el nombre que le hayas puesto al componente principal

// Este es el componente que Next.js busca para renderizar la página raíz.
export default function Home() {
  return (
    // Renderiza el componente que contiene toda la lógica.
    <AppContent /> 
  );
}