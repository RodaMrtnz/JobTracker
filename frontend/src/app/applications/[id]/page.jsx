'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ApplicationForm from '@/components/ApplicationForm';
import Link from 'next/link';
import applicationsService from '@/app/services/applicationsService';

const statusLabels = {
  applied: 'Applied',
  interviewing: 'Interviewing',
  offer: 'Offer',
  accepted: 'Accepted',
  rejected: 'Rejected',
};

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [application, setApplication] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const isNewApplication = id === 'new';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Always fetch companies
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const companiesRes = await fetch(`${API_BASE_URL}/api/companies`, {
          credentials: 'include',
        });
        if (companiesRes.ok) {
          const companiesData = await companiesRes.json();
          setCompanies(Array.isArray(companiesData) ? companiesData : []);
        }

        // Fetch application si no es nueva
        if (!isNewApplication && id) {
          const appData = await applicationsService.getById(id);
          setApplication(appData);
        }

        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isNewApplication]);

  const handleSubmit = async (formData) => {
    try {
      setSubmitError(null);
      const data = isNewApplication
        ? await applicationsService.create(formData)
        : await applicationsService.updateById(id, formData);

      if (isNewApplication) {
        router.push(`/applications/${data.id}`);
      } else {
        setApplication(data);
        setIsEditing(false);
      }
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="app-detail-container">
        <div className="app-detail-loading">Loading...</div>
      </div>
    );
  }

  if (error && !isNewApplication) {
    return (
      <div className="app-detail-container">
        <Link href="/applications" className="app-detail-back-link">
          ← Back
        </Link>
        <div className="app-detail-error">{error}</div>
      </div>
    );
  }

  if (isNewApplication) {
    return (
      <div className="app-detail-container">
        <Link href="/applications" className="app-detail-back-link">
          ← Back
        </Link>
        <h1 className="app-detail-title">New Application</h1>
        <div className="app-detail-form-wrapper">
          <ApplicationForm
            onSubmit={handleSubmit}
            companies={companies}
            error={submitError}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="app-detail-container">
      <Link href="/applications" className="app-detail-back-link">
        ← Back
      </Link>

      {isEditing ? (
        <div>
          <h1 className="app-detail-title">Edit Application</h1>
          <div className="app-detail-form-wrapper">
            <ApplicationForm
              onSubmit={handleSubmit}
              initialData={application}
              companies={companies}
              error={submitError}
            />
            <button
              onClick={() => setIsEditing(false)}
              className="app-detail-cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="app-detail-view">
          <div className="app-detail-header">
            <div>
              <h1 className="app-detail-title">{application?.position}</h1>
              <p className="app-detail-company">{application?.Company?.name}</p>
            </div>
            <span className={`app-detail-status badge status-${application?.statusName}`}>
              {statusLabels[application?.statusName]}
            </span>
          </div>

          <div className="app-detail-content">
            <div className="app-detail-section">
              <h2 className="app-detail-section-title">Details</h2>
              <div className="app-detail-grid">
                <div className="app-detail-item">
                  <span className="app-detail-label">Technology:</span>
                  <span>{application?.technology}</span>
                </div>
                <div className="app-detail-item">
                  <span className="app-detail-label">Description:</span>
                  <p className="app-detail-description">{application?.description}</p>
                </div>
                <div className="app-detail-item">
                  <span className="app-detail-label">Link:</span>
                  <a
                    href={application?.jobLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="app-detail-link"
                  >
                    View complete offer
                  </a>
                </div>
              </div>
            </div>

            <div className="app-detail-actions">
              <button
                onClick={() => setIsEditing(true)}
                className="app-detail-edit-button"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
