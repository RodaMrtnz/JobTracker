'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import CompanyForm from '@/components/CompanyForm';
import companiesService from '@/app/services/companiesService';


export default function NewCompanyPage() {
  const router = useRouter();

  const [submitError, setSubmitError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setSubmitError(null);
      setSaving(true);

      const data = await companiesService.create(formData);

      // tu service devuelve { id, name, industry, message }
      router.push(`/companies/${data.id}`);
    } catch (err) {
      setSubmitError(err?.message || 'Error creating company');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app-detail-container">
      <Link href="/" className="app-detail-back-link">← Back</Link>

      <h1 className="app-detail-title">New Company</h1>

      <div className="app-detail-form-wrapper">
        <CompanyForm onSubmit={handleSubmit} error={submitError} loading={saving} />
      </div>
    </div>
  );
}
