'use client';

import Link from 'next/link';

const statusLabels = {
  applied: 'Applied',
  interviewing: 'Interviewing',
  offer: 'Offer',
  accepted: 'Accepted',
  rejected: 'Rejected',
};

export default function ApplicationCard({ application }) {
  const getStatusClass = (status) => {
    return `status-${status}`;
  };

  return (
    <Link href={`/applications/${application.id}`}>
      <div className="card app-card">
        <div className="app-card-header">
          <div>
            <h3 className="app-card-position">{application.position}</h3>
            <p className="app-card-company">{application.Company?.name || 'Unknown company'}</p>
          </div>
          <span className={`badge ${getStatusClass(application.statusName)}`}>
            {statusLabels[application.statusName]}
          </span>
        </div>

        <div className="app-card-content">
          <div className="app-card-field">
            <span className="app-card-field-label">Technology:</span>
            <span className="app-card-field-value">{application.technology}</span>
          </div>
          <p className="app-card-description">{application.description}</p>
        </div>

        <div className="app-card-footer">
          <a
            href={application.jobLink}
            target="_blank"
            rel="noopener noreferrer"
            className="app-card-link"
            onClick={(e) => e.stopPropagation()}
          >
            View offer →
          </a>
        </div>
      </div>
    </Link>
  );
}
