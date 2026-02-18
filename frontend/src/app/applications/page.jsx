'use client';

import { useEffect, useState } from 'react';
import ApplicationCard from '@/components/ApplicationCard';
import Link from 'next/link';
import applicationsService from '@/app/services/applicationsService';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await applicationsService.getAll();
        setApplications(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="applications-container">
        <h1 className="applications-title">My Applications</h1>
        <div className="applications-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="applications-container">
      <div className="applications-header">
        <h1 className="applications-title">My Applications</h1>
        <Link href="/applications/new" className="applications-button">
          + New Application
        </Link>
      </div>

      {error && (
        <div className="applications-error">
          {error}
        </div>
      )}

      {applications.length === 0 ? (
        <div className="applications-empty">
          <p className="applications-empty-text">No applications registered</p>
          <Link href="/applications/new" className="applications-empty-button">
            Create your first application
          </Link>
        </div>
      ) : (
        <div className="applications-grid">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}
    </div>
  );
}
