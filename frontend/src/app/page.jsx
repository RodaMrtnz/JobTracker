'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <h1 className="home-title">Bienvenido a JobTracker</h1>
        <p className="home-subtitle">
          Gestiona tus aplicaciones de trabajo de manera eficiente
        </p>
        <Link href="/applications" className="home-button">
          Ver mis Aplicaciones
        </Link>
      </div>

      <div className="home-features">
        <div className="home-feature-card">
          <h3 className="home-feature-title">📋 Organiza</h3>
          <p className="home-feature-text">
            Mantén un registro completo de todas tus aplicaciones
          </p>
        </div>

        <div className="home-feature-card">
          <h3 className="home-feature-title">📊 Monitorea</h3>
          <p className="home-feature-text">
            Sigue el estado de cada aplicación en tiempo real
          </p>
        </div>

        <div className="home-feature-card">
          <h3 className="home-feature-title">🎯 Destaca</h3>
          <p className="home-feature-text">
            Mejora tu proceso de búsqueda de empleo
          </p>
        </div>
      </div>
    </div>
  );
}
