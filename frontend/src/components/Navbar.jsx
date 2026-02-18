'use client';

import '../styles/globals.css'; 
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthProvider';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        
        <Link href="/" className="navbar-logo">
          JobTracker
        </Link>

        
        {isAuthenticated ? (
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
        ) : null}

        
        <div className="navbar-links navbar-links-right">
          {isAuthenticated ? (
            <>
              <Link href="/profile" className="navbar-link navbar-link-primary">
                {user?.name || 'Profile'}
              </Link>

              <button type="button" className="navbar-link navbar-link-primary" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="navbar-link navbar-link-primary">
                Login
              </Link>

              <Link href="/register" className="navbar-link navbar-link-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
