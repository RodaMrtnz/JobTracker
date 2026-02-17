'use client';

import Navbar from '@/components/Navbar';
import '../styles/globals.css';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

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
