'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <h1 className="home-title">Welcome to JobTracker</h1>
        <p className="home-subtitle">
          Manage your job applications efficiently
        </p>
        <Link href="/applications" className="home-button">
          View My Applications
        </Link>
      </div>

      <div className="home-features">
        <div className="home-feature-card">
          <h3 className="home-feature-title">📋 Organize</h3>
          <p className="home-feature-text">
            Keep a complete record of all your applications
          </p>
        </div>

        <div className="home-feature-card">
          <h3 className="home-feature-title">📊 Monitor</h3>
          <p className="home-feature-text">
            Track the status of each application in real-time
          </p>
        </div>

        <div className="home-feature-card">
          <h3 className="home-feature-title">🎯 Stand Out</h3>
          <p className="home-feature-text">
            Improve your job search process
          </p>
        </div>
      </div>
    </div>
  );
}
