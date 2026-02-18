'use client';

import '../styles/globals.css'; 
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        
        <Link href="/" className="navbar-logo">
          JobTracker
        </Link>

        
        <div className="navbar-links navbar-links-center">
          <Link href="/dashboard" className="navbar-link">
            Dashboard
          </Link>

          <Link href="/applications" className="navbar-link">
            My Applications
          </Link>

          <Link href="/companies/new" className="navbar-link">
            Create company
          </Link>
        </div>

        
        <div className="navbar-links navbar-links-right">
          <Link href="/login" className="navbar-link navbar-link-primary">
            Login
          </Link>

          <Link href="/register" className="navbar-link navbar-link-primary">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
