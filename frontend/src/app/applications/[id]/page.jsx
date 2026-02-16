'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ApplicationForm from '@/components/ApplicationForm';
import Link from 'next/link';

const statusLabels = {
  applied: 'Aplicada',
  interviewing: 'Entrevista',
  offer: 'Oferta',
  accepted: 'Aceptada',
  rejected: 'Rechazada',
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

        // Fetch companies siempre
        const companiesRes = await fetch('/api/companies', {
          credentials: 'include',
        });
        if (companiesRes.ok) {
          const companiesData = await companiesRes.json();
          setCompanies(Array.isArray(companiesData) ? companiesData : []);
        }

        // Fetch application si no es nueva
        if (!isNewApplication && id) {
          const appRes = await fetch(`/api/applications/${id}`, {
            credentials: 'include',
          });

          if (!appRes.ok) {
            throw new Error('Aplicación no encontrada');
          }

          const appData = await appRes.json();
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

      const method = isNewApplication ? 'POST' : 'PUT';
      const url = isNewApplication ? '/api/applications' : `/api/applications/${id}`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar la aplicación');
      }

      const data = await response.json();

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
        <div className="app-detail-loading">Cargando...</div>
      </div>
    );
  }

  if (error && !isNewApplication) {
    return (
      <div className="app-detail-container">
        <Link href="/applications" className="app-detail-back-link">
          ← Volver
        </Link>
        <div className="app-detail-error">{error}</div>
      </div>
    );
  }

  if (isNewApplication) {
    return (
      <div className="app-detail-container">
        <Link href="/applications" className="app-detail-back-link">
          ← Volver
        </Link>
        <h1 className="app-detail-title">Nueva Aplicación</h1>
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
        ← Volver
      </Link>

      {isEditing ? (
        <div>
          <h1 className="app-detail-title">Editar Aplicación</h1>
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
              Cancelar
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
              <h2 className="app-detail-section-title">Detalles</h2>
              <div className="app-detail-grid">
                <div className="app-detail-item">
                  <span className="app-detail-label">Tecnología:</span>
                  <span>{application?.technology}</span>
                </div>
                <div className="app-detail-item">
                  <span className="app-detail-label">Descripción:</span>
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
                    Ver oferta completa
                  </a>
                </div>
              </div>
            </div>

            <div className="app-detail-actions">
              <button
                onClick={() => setIsEditing(true)}
                className="app-detail-edit-button"
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
