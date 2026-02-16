'use client';

import '../styles/globals.css';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <nav className="navbar">
          <div className="navbar-content">
            <Link href="/" className="navbar-logo">
              JobTracker
            </Link>
            <div className="navbar-links">
              <Link href="/applications" className="navbar-link">
                Mis Aplicaciones
              </Link>
            </div>
          </div>
        </nav>

        <main className="main">
          <div className="container">
            {children}
          </div>
        </main>

        <footer className="footer">
          <div className="container">
            <p>&copy; 2026 JobTracker. Todos los derechos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
