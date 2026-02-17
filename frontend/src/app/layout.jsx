'use client';

import '../styles/globals.css';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <div className="navbar-content">
            <Link href="/" className="navbar-logo">
              JobTracker
            </Link>
            <div className="navbar-links">
              <Link href="/applications" className="navbar-link">
                My Applications
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
            <p>&copy; 2026 JobTracker. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
