'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import CompanyForm from '@/components/CompanyForm';
import companiesService from '../../services/companiesService';


export default function CompanyDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await companiesService.getById(id);
        setCompany(data);
        setError(null);
      } catch (err) {
        setError(err?.message || 'Company not found');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setSubmitError(null);
      setSaving(true);

      const updated = await companiesService.updateById(id, formData);
      setCompany(updated);
      setIsEditing(false);
    } catch (err) {
      setSubmitError(err?.message || 'Error updating company');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="app-detail-container">
        <div className="app-detail-loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-detail-container">
        <Link href="/" className="app-detail-back-link">← Back</Link>
        <div className="app-detail-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="app-detail-container">
      <Link href="/" className="app-detail-back-link">← Back</Link>

      {isEditing ? (
        <div>
          <h1 className="app-detail-title">Edit Company</h1>

          <div className="app-detail-form-wrapper">
            <CompanyForm
              onSubmit={handleSubmit}
              initialData={company}
              error={submitError}
              loading={saving}
            />

            <button
              onClick={() => setIsEditing(false)}
              className="app-detail-cancel-button"
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="app-detail-view">
          <div className="app-detail-header">
            <div>
              <h1 className="app-detail-title">{company?.name}</h1>
              <p className="app-detail-company">{company?.industry}</p>
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
      )}
    </div>
  );
}
